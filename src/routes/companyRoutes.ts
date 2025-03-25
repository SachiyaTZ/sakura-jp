import express from 'express';
import { registerCompany, approveCompany, getCompanies } from '../controllers/companyController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/register', authenticate, authorize(['admin']), registerCompany);

// Admin-only routes
router.put('/approve/:id', authenticate, authorize(['admin']), approveCompany);
router.get('/', authenticate, authorize(['admin']), getCompanies);

export default router;