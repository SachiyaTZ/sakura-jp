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
exports.getAllCategories = exports.softDeleteCategory = exports.updateCategory = exports.getCategoryById = exports.addCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
// Add Category
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brandId, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !brandId || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, brandId, or companyId' });
            return;
        }
        const category = new Category_1.default({ name, brandId, companyId });
        yield category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    }
    catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Error adding category' });
    }
});
exports.addCategory = addCategory;
// Get Category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield Category_1.default.findOne({ _id: id, deleted: false });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Error fetching category' });
    }
});
exports.getCategoryById = getCategoryById;
// Update Category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, brandId, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !brandId || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, brandId, or companyId' });
            return;
        }
        // Update the category
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(id, { name, brandId, companyId }, { new: true } // Return the updated document
        );
        if (!updatedCategory) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Error updating category' });
    }
});
exports.updateCategory = updateCategory;
// Soft Delete Category
const softDeleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield Category_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedCategory) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category soft deleted successfully', category: deletedCategory });
    }
    catch (error) {
        console.error('Error soft deleting category:', error);
        res.status(500).json({ error: 'Error soft deleting category' });
    }
});
exports.softDeleteCategory = softDeleteCategory;
// Get all Categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find({ deleted: false });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
});
exports.getAllCategories = getAllCategories;
