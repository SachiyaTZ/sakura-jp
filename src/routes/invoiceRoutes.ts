import express from 'express';
import { createInvoice, getInvoiceById, softDeleteInvoice, updateInvoice } from '../controllers/invoiceController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
router.post('/', authenticate, authorize(['admin']), createInvoice);
router.get('/test', (req, res) => {
    res.json({ message: 'Invoice routes are working!' });
});

router.get('/:id', authenticate, authorize(['admin']), getInvoiceById);
router.put('/:id', authenticate, authorize(['admin']), updateInvoice);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteInvoice);

export default router;