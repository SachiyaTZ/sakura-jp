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
exports.getDashboard = exports.createDashboard = exports.getInventoryTurnover = exports.createInventoryTurnover = exports.getSalesPerformance = exports.createSalesPerformance = exports.getCustomerBehavior = exports.createCustomerBehavior = exports.getSalesReports = exports.createSalesReport = void 0;
const SalesReport_1 = __importDefault(require("../models/SalesReport"));
const CustomerBehavior_1 = __importDefault(require("../routes/CustomerBehavior"));
const SalesPerformance_1 = __importDefault(require("../models/SalesPerformance"));
const InventoryTurnover_1 = __importDefault(require("../models/InventoryTurnover"));
const Dashboard_1 = __importDefault(require("../models/Dashboard"));
const createSalesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, totalSales, totalOrders, averageOrderValue } = req.body;
    try {
        const salesReport = new SalesReport_1.default({ date, totalSales, totalOrders, averageOrderValue });
        yield salesReport.save();
        res.status(201).json({ message: 'Sales report created successfully', salesReport });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating sales report' });
    }
});
exports.createSalesReport = createSalesReport;
const getSalesReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesReports = yield SalesReport_1.default.find();
        res.json(salesReports);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching sales reports' });
    }
});
exports.getSalesReports = getSalesReports;
const createCustomerBehavior = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, totalOrders, totalSpent, lastPurchaseDate } = req.body;
    try {
        const customerBehavior = new CustomerBehavior_1.default({ userId, totalOrders, totalSpent, lastPurchaseDate });
        yield customerBehavior.save();
        res.status(201).json({ message: 'Customer behavior data created successfully', customerBehavior });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating customer behavior data' });
    }
});
exports.createCustomerBehavior = createCustomerBehavior;
const getCustomerBehavior = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerBehavior = yield CustomerBehavior_1.default.find().populate('userId');
        res.json(customerBehavior);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching customer behavior data' });
    }
});
exports.getCustomerBehavior = getCustomerBehavior;
const createSalesPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, totalSales, totalOrders, averageOrderValue } = req.body;
    try {
        const salesPerformance = new SalesPerformance_1.default({ companyId, totalSales, totalOrders, averageOrderValue });
        yield salesPerformance.save();
        res.status(201).json({ message: 'Sales performance data created successfully', salesPerformance });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating sales performance data' });
    }
});
exports.createSalesPerformance = createSalesPerformance;
const getSalesPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesPerformance = yield SalesPerformance_1.default.find().populate('companyId');
        res.json(salesPerformance);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching sales performance data' });
    }
});
exports.getSalesPerformance = getSalesPerformance;
const createInventoryTurnover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, turnoverRate, date } = req.body;
    try {
        const inventoryTurnover = new InventoryTurnover_1.default({ productId, turnoverRate, date });
        yield inventoryTurnover.save();
        res.status(201).json({ message: 'Inventory turnover data created successfully', inventoryTurnover });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating inventory turnover data' });
    }
});
exports.createInventoryTurnover = createInventoryTurnover;
const getInventoryTurnover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryTurnover = yield InventoryTurnover_1.default.find().populate('productId');
        res.json(inventoryTurnover);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching inventory turnover data' });
    }
});
exports.getInventoryTurnover = getInventoryTurnover;
const createDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, widgets } = req.body;
    try {
        const dashboard = new Dashboard_1.default({ companyId, widgets });
        yield dashboard.save();
        res.status(201).json({ message: 'Dashboard created successfully', dashboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating dashboard' });
    }
});
exports.createDashboard = createDashboard;
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req.params;
    try {
        const dashboard = yield Dashboard_1.default.findOne({ companyId }).populate('companyId');
        res.json(dashboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching dashboard' });
    }
});
exports.getDashboard = getDashboard;
