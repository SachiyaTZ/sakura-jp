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
exports.getAllSubCategories = exports.softDeleteSubCategory = exports.updateSubCategory = exports.getSubCategoryById = exports.addSubCategory = void 0;
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
// Add SubCategory
const addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brandId, categoryId, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !brandId || !categoryId || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, brandId, categoryId, or companyId' });
            return;
        }
        const subCategory = new SubCategory_1.default({ name, brandId, categoryId, companyId });
        yield subCategory.save();
        res.status(201).json({ message: 'SubCategory added successfully', subCategory });
    }
    catch (error) {
        console.error('Error adding subCategory:', error);
        res.status(500).json({ error: 'Error adding subCategory' });
    }
});
exports.addSubCategory = addSubCategory;
// Get SubCategory by ID
const getSubCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subCategory = yield SubCategory_1.default.findOne({ _id: id, deleted: false });
        if (!subCategory) {
            res.status(404).json({ error: 'SubCategory not found' });
            return;
        }
        res.status(200).json(subCategory);
    }
    catch (error) {
        console.error('Error fetching subCategory:', error);
        res.status(500).json({ error: 'Error fetching subCategory' });
    }
});
exports.getSubCategoryById = getSubCategoryById;
// Update SubCategory
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, brandId, categoryId, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !brandId || !categoryId || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, brandId, categoryId, or companyId' });
            return;
        }
        // Update the subcategory
        const updatedSubCategory = yield SubCategory_1.default.findByIdAndUpdate(id, { name, brandId, categoryId, companyId }, { new: true } // Return the updated document
        );
        if (!updatedSubCategory) {
            res.status(404).json({ error: 'SubCategory not found' });
            return;
        }
        res.status(200).json({ message: 'SubCategory updated successfully', subCategory: updatedSubCategory });
    }
    catch (error) {
        console.error('Error updating subCategory:', error);
        res.status(500).json({ error: 'Error updating subCategory' });
    }
});
exports.updateSubCategory = updateSubCategory;
// Soft Delete SubCategory
const softDeleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSubCategory = yield SubCategory_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedSubCategory) {
            res.status(404).json({ error: 'SubCategory not found' });
            return;
        }
        res.status(200).json({ message: 'SubCategory soft deleted successfully', subCategory: deletedSubCategory });
    }
    catch (error) {
        console.error('Error soft deleting subCategory:', error);
        res.status(500).json({ error: 'Error soft deleting subCategory' });
    }
});
exports.softDeleteSubCategory = softDeleteSubCategory;
// get all subcategories
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield SubCategory_1.default.find({ deleted: false });
        res.status(200).json(subCategories);
    }
    catch (error) {
        console.error('Error fetching subCategories:', error);
        res.status(500).json({ error: 'Error fetching subCategories' });
    }
});
exports.getAllSubCategories = getAllSubCategories;
