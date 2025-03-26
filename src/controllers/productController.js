"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.softDeleteProduct = exports.getAllProducts = exports.createProduct = exports.checkStock = exports.createProductBundle = exports.setCustomPrice = exports.bulkImportProducts = exports.getRecommendations = exports.addReview = exports.searchProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const xlsx_1 = __importDefault(require("xlsx"));
const CustomPricing_1 = __importDefault(require("../models/CustomPricing"));
const ProductBundle_1 = __importDefault(require("../models/ProductBundle"));
// Helper function to validate and process images
const processImages = (images) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const processedImages = [];
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
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, category, minPrice, maxPrice, sortBy } = req.query;
    try {
        const filter = {};
        if (query)
            filter.name = { $regex: query, $options: 'i' };
        if (category)
            filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = parseFloat(minPrice);
            if (maxPrice)
                filter.price.$lte = parseFloat(maxPrice);
        }
        const sort = {};
        if (sortBy === 'price_asc')
            sort.price = 1;
        if (sortBy === 'price_desc')
            sort.price = -1;
        const products = yield Product_1.default.find(filter).sort(sort);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Error searching products' });
    }
});
exports.searchProducts = searchProducts;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { userId, review, rating } = req.body;
    try {
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        if (!product.ratings)
            product.ratings = [];
        if (!product.reviews)
            product.reviews = [];
        if (rating)
            product.ratings.push({ userId, rating });
        if (review)
            product.reviews.push({ userId, review });
        yield product.save();
        res.json({ message: 'Review added successfully', product });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding review' });
    }
});
exports.addReview = addReview;
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        // Example: Recommend products based on user's purchase history or preferences
        const recommendedProducts = yield Product_1.default.find().limit(10); // Replace with actual logic
        res.json(recommendedProducts);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching recommendations' });
    }
});
exports.getRecommendations = getRecommendations;
const bulkImportProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
    const filePath = req.file.path;
    const products = [];
    try {
        if (filePath.endsWith('.csv')) {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => products.push(row))
                .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                yield Product_1.default.insertMany(products);
                res.json({ message: 'Products imported successfully', products });
            }));
        }
        else if (filePath.endsWith('.xlsx')) {
            const workbook = xlsx_1.default.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx_1.default.utils.sheet_to_json(sheet);
            yield Product_1.default.insertMany(data);
            res.json({ message: 'Products imported successfully', products: data });
        }
        else {
            res.status(400).json({ error: 'Unsupported file format' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error importing products' });
    }
    finally {
        fs_1.default.unlinkSync(filePath); // Delete the file after processing
    }
});
exports.bulkImportProducts = bulkImportProducts;
const setCustomPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, productId, price } = req.body;
    try {
        const customPrice = new CustomPricing_1.default({ customerId, productId, price });
        yield customPrice.save();
        res.status(201).json({ message: 'Custom price set successfully', customPrice });
    }
    catch (error) {
        res.status(500).json({ error: 'Error setting custom price' });
    }
});
exports.setCustomPrice = setCustomPrice;
const createProductBundle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, products, price } = req.body;
    try {
        const productBundle = new ProductBundle_1.default({ name, products, price });
        yield productBundle.save();
        res.status(201).json({ message: 'Product bundle created successfully', productBundle });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating product bundle' });
    }
});
exports.createProductBundle = createProductBundle;
const checkStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ stock: product.stock });
    }
    catch (error) {
        res.status(500).json({ error: 'Error checking stock' });
    }
});
exports.checkStock = checkStock;
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
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Process text fields
        const { name, description, price, category, subCategory, brand, company, stock, colors, sizes, babyClothSizes, moq } = req.body;
        // Process image files
        const imageFiles = req.files;
        const images = imageFiles.map(file => {
            return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        });
        // Create the product
        const product = new Product_1.default({
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
        yield product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Error creating product'
        });
    }
});
exports.createProduct = createProduct;
// Get All Products (excluding soft-deleted ones)
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find({ deleted: false });
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
exports.getAllProducts = getAllProducts;
// Soft Delete Product
const softDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield Product_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true } // Return the updated document
        );
        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product soft deleted successfully', product: deletedProduct });
    }
    catch (error) {
        console.error('Error soft deleting product:', error);
        res.status(500).json({ error: 'Error soft deleting product' });
    }
});
exports.softDeleteProduct = softDeleteProduct;
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, category, subCategory, brand, company, stock, colors, sizes, babyClothSizes, existingImages = [] // Array of Base64 strings to keep
         } = req.body;
        // Validate required fields
        if (!name || !description || !price || !category || !subCategory || !brand || !company || !stock) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        // Process new images if any
        let newImages = [];
        if (req.files && Array.isArray(req.files)) {
            newImages = processImages(req.files);
        }
        // Combine existing and new images
        const allImages = [...(existingImages || []), ...newImages];
        // Update the product
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, {
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
        }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Error updating product'
        });
    }
});
exports.updateProduct = updateProduct;
