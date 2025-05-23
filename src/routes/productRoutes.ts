import express from 'express';
import { addReview, bulkImportProducts, createProductBundle, getRecommendations, searchProducts, setCustomPrice, checkStock, createProduct, getAllProducts, softDeleteProduct, updateProduct, getProductById, getCompanyProducts } from '../controllers/productController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
      files: 5 // Max 5 files
    },
    fileFilter: (req, file, cb) => {
      if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG are allowed.'));
      }
    }
});

// Public routes
router.get('/search', searchProducts);
router.get('/:productId/stock', checkStock);
router.post('/:productId/reviews', authenticate, addReview);
router.get('/users/:userId/recommendations', getRecommendations);

// Admin-only routes
router.post('/bulk-import', authenticate, authorize(['admin']), upload.single('file'), bulkImportProducts);
router.post('/custom-pricing', authenticate, authorize(['admin']), setCustomPrice);
router.post('/bundles', authenticate, authorize(['admin','manager']), createProductBundle);

router.post('/', authenticate, authorize(['admin', 'manager']), upload.array('images'), createProduct);
router.get('/', authenticate, authorize(['admin', 'manager']), getAllProducts);
router.delete('/:id', authenticate, authorize(['admin', 'manager']), softDeleteProduct);
router.put('/:id', authenticate, authorize(['admin']), upload.array('newImages'), updateProduct); 
router.get('/:id', authenticate, authorize(['admin', 'manager', 'buyer']), getProductById);
router.get('/company/:companyId?', authenticate, authorize(['admin', 'manager']), getCompanyProducts);

export default router;