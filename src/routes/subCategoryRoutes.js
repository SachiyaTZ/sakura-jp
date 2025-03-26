"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = require("../controllers/subCategoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subCategoryController_1.addSubCategory);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subCategoryController_1.getAllSubCategories);
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subCategoryController_1.getSubCategoryById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subCategoryController_1.updateSubCategory);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subCategoryController_1.softDeleteSubCategory);
exports.default = router;
