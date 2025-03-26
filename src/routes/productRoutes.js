"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // Store files in memory
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 5 // Max 5 files
    },
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, JPG, PNG are allowed.'));
        }
    }
});
// Public routes
router.get('/search', productController_1.searchProducts);
router.get('/:productId/stock', productController_1.checkStock);
router.post('/:productId/reviews', authMiddleware_1.authenticate, productController_1.addReview);
router.get('/users/:userId/recommendations', productController_1.getRecommendations);
// Admin-only routes
router.post('/bulk-import', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), upload.single('file'), productController_1.bulkImportProducts);
router.post('/custom-pricing', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), productController_1.setCustomPrice);
router.post('/bundles', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), productController_1.createProductBundle);
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), upload.array('images'), productController_1.createProduct);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), productController_1.getAllProducts); // Add this route
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), productController_1.softDeleteProduct); // Add this route
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), upload.array('newImages'), productController_1.updateProduct);
exports.default = router;
