"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/sales-reports', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.createSalesReport);
router.get('/sales-reports', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.getSalesReports);
router.post('/customer-behavior', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.createCustomerBehavior);
router.get('/customer-behavior', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.getCustomerBehavior);
router.post('/sales-performance', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.createSalesPerformance);
router.get('/sales-performance', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.getSalesPerformance);
router.post('/inventory-turnover', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.createInventoryTurnover);
router.get('/inventory-turnover', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), analyticsController_1.getInventoryTurnover);
router.post('/dashboards', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), analyticsController_1.createDashboard);
router.get('/dashboards/:companyId', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), analyticsController_1.getDashboard);
exports.default = router;
