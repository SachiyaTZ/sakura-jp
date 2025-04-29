import { Request, Response } from 'express';
import Product from '../models/Product';
import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import CustomPricing from '../models/CustomPricing';
import ProductBundle from '../models/ProductBundle';
import multer from 'multer';

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
      // Example: Recommend products based on user's purchase history or preferences
      const recommendedProducts = await Product.find().limit(10); // Replace with actual logic
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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Process text fields
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
      moq
    } = req.body;

    // Process image files
    const imageFiles = req.files as Express.Multer.File[];
    const images = imageFiles.map(file => {
      return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });

    // Create the product
    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      brand,
      company,
      stock: parseInt(stock),
      colors: JSON.parse(colors),
      sizes: JSON.parse(sizes),
      babyClothSizes: JSON.parse(babyClothSizes),
      moq: moq ? parseInt(moq) : 1,
      images
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error creating product' 
    });
  }
};

// Get All Products (excluding soft-deleted ones)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ deleted: false });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Soft Delete Product
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

// Update Product with Images
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