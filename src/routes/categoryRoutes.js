"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.addCategory);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.getAllCategories);
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.getCategoryById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.updateCategory);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), categoryController_1.softDeleteCategory);
exports.default = router;
