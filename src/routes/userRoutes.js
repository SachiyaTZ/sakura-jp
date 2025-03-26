"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Public routes
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
// Protected routes
router.get('/profile', authMiddleware_1.authenticate, userController_1.getUserProfile);
// Verification route
router.get('/verify', userController_1.verifyUser);
// Forgot password route
router.post('/forgot-password', userController_1.forgotPassword);
// Reset password route
router.post('/reset-password', userController_1.resetPassword);
// Admin-only route
router.get('/admin/users', authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(['admin']), userController_1.getAllUsers);
// Admin-only routes
router.post('/bulk-import', authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(['admin']), upload.single('file'), userController_1.bulkImportUsers);
router.get('/bulk-export', authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(['admin']), userController_1.bulkExportUsers);
exports.default = router;
