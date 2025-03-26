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
exports.softDeleteWarehouse = exports.updateWarehouse = exports.getWarehouseById = exports.addWarehouse = void 0;
const Warehouse_1 = __importDefault(require("../models/Warehouse"));
// export const addWarehouse = async (req: Request, res: Response): Promise<void> => {
//   const { name, location } = req.body;
//   try {
//     const warehouse = new Warehouse({ name, location });
//     await warehouse.save();
//     res.status(201).json({ message: 'Warehouse added successfully', warehouse });
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding warehouse' });
//   }
// };
const addWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !location || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, location, or companyId' });
            return;
        }
        const warehouse = new Warehouse_1.default({ name, location, companyId });
        yield warehouse.save();
        res.status(201).json({ message: 'Warehouse added successfully', warehouse });
    }
    catch (error) {
        console.error('Error adding warehouse:', error);
        res.status(500).json({ error: 'Error adding warehouse' });
    }
});
exports.addWarehouse = addWarehouse;
const getWarehouseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const warehouse = yield Warehouse_1.default.findOne({ _id: id, deleted: false }); // Exclude soft-deleted warehouses
        if (!warehouse) {
            res.status(404).json({ error: 'Warehouse not found' });
            return;
        }
        res.status(200).json(warehouse);
    }
    catch (error) {
        console.error('Error fetching warehouse:', error);
        res.status(500).json({ error: 'Error fetching warehouse' });
    }
});
exports.getWarehouseById = getWarehouseById;
const updateWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, location, companyId } = req.body;
    try {
        // Validate required fields
        if (!name || !location || !companyId) {
            res.status(400).json({ error: 'Missing required fields: name, location, or companyId' });
            return;
        }
        // Update the warehouse
        const updatedWarehouse = yield Warehouse_1.default.findByIdAndUpdate(id, { name, location, companyId }, { new: true } // Return the updated document
        );
        if (!updatedWarehouse) {
            res.status(404).json({ error: 'Warehouse not found' });
            return;
        }
        res.status(200).json({ message: 'Warehouse updated successfully', warehouse: updatedWarehouse });
    }
    catch (error) {
        console.error('Error updating warehouse:', error);
        res.status(500).json({ error: 'Error updating warehouse' });
    }
});
exports.updateWarehouse = updateWarehouse;
const softDeleteWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Soft delete the warehouse by setting `deleted` to true
        const deletedWarehouse = yield Warehouse_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true } // Return the updated document
        );
        if (!deletedWarehouse) {
            res.status(404).json({ error: 'Warehouse not found' });
            return;
        }
        res.status(200).json({ message: 'Warehouse soft deleted successfully', warehouse: deletedWarehouse });
    }
    catch (error) {
        console.error('Error soft deleting warehouse:', error);
        res.status(500).json({ error: 'Error soft deleting warehouse' });
    }
});
exports.softDeleteWarehouse = softDeleteWarehouse;
