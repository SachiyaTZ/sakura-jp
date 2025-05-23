import { Request, Response } from 'express';
import Product from '../models/Product';
import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import CustomPricing from '../models/CustomPricing';
import ProductBundle from '../models/ProductBundle';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Company from '../models/Company';

// Helper function to validate and process images
const processImages = (images: any[]): string[] => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const processedImages: string[] = [];

  for (const image of images) {
    // Check if image is already Base64 (from update)
    if (typeof image === 'string' && image.startsWith('data:image')) {
      processedImages.push(image);
      continue;
    }

    // Validate new file uploads
    if (!allowedTypes.includes(image.mimetype)) {
      throw new Error(`Invalid image type: ${image.mimetype}. Only JPEG, JPG, PNG are allowed.`);
    }

    if (image.size > MAX_SIZE) {
      throw new Error(`Image ${image.originalname} exceeds 5MB limit`);
    }

    // Convert to Base64
    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    processedImages.push(base64Image);
  }

  return processedImages;
};

// export const createProductBundle = async (req: Request, res: Response): Promise<void> => {
//     const { name, products, price } = req.body;
  
//     try {
//       const productBundle = new ProductBundle({ name, products, price });
//       await productBundle.save();
//       res.status(201).json({ message: 'Product bundle created successfully', productBundle });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating product bundle' });
//     }
// };

// Update Product
// export const updateProduct = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     price,
//     category,
//     subCategory,
//     brand,
//     company,
//     stock,
//     colors,
//     sizes,
//     babyClothSizes,
//   } = req.body;

//   try {
//     // Validate required fields
//     if (
//       !name ||
//       !description ||
//       !price ||
//       !category ||
//       !subCategory ||
//       !brand ||
//       !company ||
//       !stock
//     ) {
//       res.status(400).json({ error: 'Missing required fields' });
//       return;
//     }

//     // Update the product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         price,
//         category,
//         subCategory,
//         brand,
//         company,
//         stock,
//         colors: colors || [],
//         sizes: sizes || [],
//         babyClothSizes: babyClothSizes || [],
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedProduct) {
//       res.status(404).json({ error: 'Product not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ error: 'Error updating product' });
//   }
// };

// Create Product
// export const createProduct = async (req: Request, res: Response): Promise<void> => {
//   const {
//     name,
//     description,
//     price,
//     category,
//     subCategory,
//     brand,
//     company,
//     stock,
//     colors,
//     sizes,
//     babyClothSizes,
//   } = req.body;

//   try {
//     // Validate required fields
//     if (
//       !name ||
//       !description ||
//       !price ||
//       !category ||
//       !subCategory ||
//       !brand ||
//       !company ||
//       !stock
//     ) {
//       res.status(400).json({ error: 'Missing required fields' });
//       return;
//     }

//     // Create the product
//     const product = new Product({
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       brand,
//       company,
//       stock,
//       colors: colors || [],
//       sizes: sizes || [],
//       babyClothSizes: babyClothSizes || [],
//     });

//     await product.save();
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ error: 'Error creating product' });
//   }
// };

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  const { query, category, minPrice, maxPrice, sortBy } = req.query;

  try {
    const filter: any = {};
    if (query) filter.name = { $regex: query, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
    }

    const sort: any = {};
    if (sortBy === 'price_asc') sort.price = 1;
    if (sortBy === 'price_desc') sort.price = -1;

    const products = await Product.find(filter).sort(sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error searching products' });
  }
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    const { userId, review, rating } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      if (!product.ratings) product.ratings = [];
      if (!product.reviews) product.reviews = [];
  
      if (rating) product.ratings.push({ userId, rating });
      if (review) product.reviews.push({ userId, review });
  
      await product.save();
      res.json({ message: 'Review added successfully', product });
    } catch (error) {
      res.status(500).json({ error: 'Error adding review' });
    }
};

export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
  
    try {
      const recommendedProducts = await Product.find().limit(10);
      res.json(recommendedProducts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommendations' });
    }
};

export const bulkImportProducts = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
  
    const filePath = req.file.path;
    const products: any[] = [];
  
    try {
      if (filePath.endsWith('.csv')) {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => products.push(row))
          .on('end', async () => {
            await Product.insertMany(products);
            res.json({ message: 'Products imported successfully', products });
          });
      } else if (filePath.endsWith('.xlsx')) {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        await Product.insertMany(data);
        res.json({ message: 'Products imported successfully', products: data });
      } else {
        res.status(400).json({ error: 'Unsupported file format' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error importing products' });
    } finally {
      fs.unlinkSync(filePath); // Delete the file after processing
    }
};

export const setCustomPrice = async (req: Request, res: Response): Promise<void> => {
    const { customerId, productId, price } = req.body;
  
    try {
      const customPrice = new CustomPricing({ customerId, productId, price });
      await customPrice.save();
      res.status(201).json({ message: 'Custom price set successfully', customPrice });
    } catch (error) {
      res.status(500).json({ error: 'Error setting custom price' });
    }
};

export const createProductBundle = async (req: Request, res: Response): Promise<void> => {
  const { name, products, price } = req.body;

  try {
    // Check if a bundle with the same name already exists
    const existingBundle = await ProductBundle.findOne({ name });
    
    if (existingBundle) {
      res.status(400).json({ error: 'A product bundle with this name already exists' });
      return;
    }

    const productBundle = new ProductBundle({ name, products, price });
    await productBundle.save();
    res.status(201).json({ message: 'Product bundle created successfully', productBundle });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product bundle' });
  }
};

export const checkStock = async (req: Request, res: Response): Promise<void> => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ stock: product.stock });
  } catch (error) {
    res.status(500).json({ error: 'Error checking stock' });
  }
};

// export const createProduct = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Process text fields
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       brand,
//       company,
//       stock,
//       colors,
//       sizes,
//       babyClothSizes,
//       moq
//     } = req.body;

//     // Process image files
//     const imageFiles = req.files as Express.Multer.File[];
//     const images = imageFiles.map(file => {
//       return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
//     });

//     // Create the product
//     const product = new Product({
//       name,
//       description,
//       price: parseFloat(price),
//       category,
//       subCategory,
//       brand,
//       company,
//       stock: parseInt(stock),
//       colors: JSON.parse(colors),
//       sizes: JSON.parse(sizes),
//       babyClothSizes: JSON.parse(babyClothSizes),
//       moq: moq ? parseInt(moq) : 1,
//       images
//     });

//     await product.save();
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ 
//       error: error instanceof Error ? error.message : 'Error creating product' 
//     });
//   }
// };

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const imageFiles = req.files as Express.Multer.File[];

    // For managers, always use their company ID and validate they're not trying to set a different one
    if (user.role === 'manager') {
      // If company is provided in request body, it must match manager's company
      if (req.body.company && req.body.company !== user.companyId.toString()) {
        res.status(403).json({ 
          error: 'Managers can only create products for their own company',
          yourCompanyId: user.companyId
        });
        return;
      }
      // Force the company to be manager's company
      req.body.company = user.companyId;
    }

    // Validate company exists (for both admin and manager)
    const companyExists = await Company.exists({ _id: req.body.company });
    if (!companyExists) {
      res.status(400).json({ error: 'Specified company does not exist' });
      return;
    }

    // Process images
    const images = imageFiles?.map(file => `/uploads/${file.filename}`) || [];

    // Create product with all parameters
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      category: req.body.category,
      subCategory: req.body.subCategory,
      brand: req.body.brand,
      company: req.body.company, // Now properly validated
      stock: parseInt(req.body.stock),
      colors: req.body.colors ? JSON.parse(req.body.colors) : [],
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      babyClothSizes: req.body.babyClothSizes ? JSON.parse(req.body.babyClothSizes) : [],
      images,
      moq: req.body.moq ? parseInt(req.body.moq) : 1,
      createdBy: user._id,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      isFeatured: req.body.isFeatured === 'true',
      discount: req.body.discount ? parseFloat(req.body.discount) : 0,
      weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
      dimensions: req.body.dimensions ? JSON.parse(req.body.dimensions) : undefined
    });

    await product.save();

    const populatedProduct = await Product.findById(product._id)
      .populate('brand', 'name')
      .populate('company', 'name')
      .populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Product created successfully',
      product: populatedProduct
    });

  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation error', details: errors });
      return;
    }
    
    res.status(500).json({ 
      error: 'Error creating product',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCompanyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const companyId = user.role === 'manager' ? user.companyId : req.params.companyId;
    if (user.role === 'manager' && user.companyId.toString() !== companyId) {
      res.status(403).json({ error: 'Not authorized to view these products' });
      return;
    }

    const products = await Product.find({ 
      company: companyId,
      deleted: false 
    }).populate('brand', 'name');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ deleted: false });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const softDeleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product soft deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error soft deleting product:', error);
    res.status(500).json({ error: 'Error soft deleting product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      company,
      stock,
      colors,
      sizes,
      babyClothSizes,
      existingImages = [] // Array of Base64 strings to keep
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory || !brand || !company || !stock) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Process new images if any
    let newImages: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      newImages = processImages(req.files);
    }

    // Combine existing and new images
    const allImages = [...(existingImages || []), ...newImages];

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        subCategory,
        brand,
        company,
        stock,
        colors: colors || [],
        sizes: sizes || [],
        babyClothSizes: babyClothSizes || [],
        images: allImages
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error updating product' 
    });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid product ID format' });
      return;
    }

    const product = await Product.findById(id)
      .populate('brand', 'name') 
      .populate('company', 'name email') 
      .lean();

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (product.deleted) {
      res.status(404).json({ error: 'Product not available' });
      return;
    }

    let averageRating = 0;
    if (product.ratings && product.ratings.length > 0) {
      const sum = product.ratings.reduce((acc, curr) => acc + curr.rating, 0);
      averageRating = sum / product.ratings.length;
    }

    const response = {
      ...product,
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount: product.reviews?.length || 0
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      error: 'Error fetching product details',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};