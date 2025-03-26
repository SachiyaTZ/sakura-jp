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
exports.getCompanies = exports.approveCompany = exports.registerCompany = void 0;
const Company_1 = __importDefault(require("../models/Company"));
const registerCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, address, phone } = req.body;
    console.log('Request body:', req.body); // Log the request body
    try {
        // Check for duplicate email
        const existingCompany = yield Company_1.default.findOne({ email });
        if (existingCompany) {
            res.status(400).json({ error: 'A company with this email already exists.' });
            return;
        }
        const company = new Company_1.default({ name, email, address, phone, status: 'pending' });
        yield company.save();
        res.status(201).json({ message: 'Company registration request submitted. Awaiting admin approval.', company });
    }
    catch (error) {
        console.error('Error registering company:', error); // Log the full error object
        const err = error; // Type assertion
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
            res.status(400).json({ error: err.message });
        }
        else if (err.code === 11000) {
            // Handle duplicate key errors (e.g., duplicate email)
            res.status(400).json({ error: 'A company with this email already exists.' });
        }
        else {
            res.status(500).json({ error: 'Error registering company' });
        }
    }
});
exports.registerCompany = registerCompany;
const approveCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    try {
        const company = yield Company_1.default.findByIdAndUpdate(id, { status, adminNotes }, { new: true });
        res.json({ message: 'Company status updated', company });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating company status' });
    }
});
exports.approveCompany = approveCompany;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield Company_1.default.find();
        res.json(companies);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching companies' });
    }
});
exports.getCompanies = getCompanies;
