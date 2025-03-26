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
exports.deleteAddress = exports.updateAddress = exports.getAddresses = exports.addAddress = void 0;
const Address_1 = __importDefault(require("../models/Address"));
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, street, city, state, postalCode, country } = req.body;
    try {
        const address = new Address_1.default({ userId, street, city, state, postalCode, country });
        yield address.save();
        res.status(201).json({ message: 'Address added successfully', address });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding address' });
    }
});
exports.addAddress = addAddress;
const getAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const addresses = yield Address_1.default.find({ userId });
        res.json(addresses);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching addresses' });
    }
});
exports.getAddresses = getAddresses;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { street, city, state, postalCode, country } = req.body;
    try {
        const address = yield Address_1.default.findByIdAndUpdate(id, { street, city, state, postalCode, country }, { new: true });
        res.json({ message: 'Address updated successfully', address });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating address' });
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Address_1.default.findByIdAndDelete(id);
        res.json({ message: 'Address deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting address' });
    }
});
exports.deleteAddress = deleteAddress;
