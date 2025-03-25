import express from 'express';
import { createCustomerBehavior, createDashboard, createInventoryTurnover, createSalesPerformance, createSalesReport, getCustomerBehavior, getDashboard, getInventoryTurnover, getSalesPerformance, getSalesReports } from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/sales-reports', authenticate, authorize(['admin']), createSalesReport);
router.get('/sales-reports', authenticate, authorize(['admin']), getSalesReports);
router.post('/customer-behavior', authenticate, authorize(['admin']), createCustomerBehavior);
router.get('/customer-behavior', authenticate, authorize(['admin']), getCustomerBehavior);
router.post('/sales-performance', authenticate, authorize(['admin']), createSalesPerformance);
router.get('/sales-performance', authenticate, authorize(['admin']), getSalesPerformance);
router.post('/inventory-turnover', authenticate, authorize(['admin']), createInventoryTurnover);
router.get('/inventory-turnover', authenticate, authorize(['admin']), getInventoryTurnover);
router.post('/dashboards', authenticate, authorize(['admin', 'manager']), createDashboard);
router.get('/dashboards/:companyId', authenticate, authorize(['admin', 'manager']), getDashboard);

export default router;