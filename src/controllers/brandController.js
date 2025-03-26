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
exports.getAllBrands = exports.softDeleteBrand = exports.updateBrand = exports.getBrandById = exports.addBrand = void 0;
const Brand_1 = __importDefault(require("../models/Brand"));
// Add Brand
const addBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, companyId } = req.body;
    try {
        if (!name || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name or companyId' });
            return;
        }
        const brand = new Brand_1.default({ name, companyId });
        yield brand.save();
        res.status(201).json({ message: 'Brand added successfully', brand });
    }
    catch (error) {
        console.error('Error adding brand:', error);
        res.status(500).json({ error: 'Error adding brand' });
    }
});
exports.addBrand = addBrand;
// Get Brand by ID
const getBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const brand = yield Brand_1.default.findOne({ _id: id, deleted: false });
        if (!brand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        res.status(200).json(brand);
    }
    catch (error) {
        console.error('Error fetching brand:', error);
        res.status(500).json({ error: 'Error fetching brand' });
    }
});
exports.getBrandById = getBrandById;
// Update Brand
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, companyId } = req.body;
    try {
        if (!name || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name or companyId' });
            return;
        }
        const updatedBrand = yield Brand_1.default.findByIdAndUpdate(id, { name, companyId }, { new: true });
        if (!updatedBrand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
    }
    catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ error: 'Error updating brand' });
    }
});
exports.updateBrand = updateBrand;
// Soft Delete Brand
const softDeleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBrand = yield Brand_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedBrand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        res.status(200).json({ message: 'Brand soft deleted successfully', brand: deletedBrand });
    }
    catch (error) {
        console.error('Error soft deleting brand:', error);
        res.status(500).json({ error: 'Error soft deleting brand' });
    }
});
exports.softDeleteBrand = softDeleteBrand;
// Get All Brands
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield Brand_1.default.find({ deleted: false });
        res.status(200).json(brands);
    }
    catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ error: 'Error fetching brands' });
    }
});
exports.getAllBrands = getAllBrands;
