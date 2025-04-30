import express from 'express';
import { registerCompany, approveCompany, getCompanies, getCompanyById } from '../controllers/companyController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/register', authenticate, authorize(['admin']), registerCompany);

// Admin-only routes
router.put('/approve/:id', authenticate, authorize(['admin']), approveCompany);
router.get('/', authenticate, authorize(['admin']), getCompanies);
router.get('/:id', authenticate, authorize(['admin', 'manager' , 'buyer']), getCompanyById);

export default router;