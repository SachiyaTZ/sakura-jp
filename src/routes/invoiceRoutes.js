"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoiceController_1 = require("../controllers/invoiceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only route
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), invoiceController_1.createInvoice);
router.get('/test', (req, res) => {
    res.json({ message: 'Invoice routes are working!' });
});
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), invoiceController_1.getInvoiceById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), invoiceController_1.updateInvoice);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), invoiceController_1.softDeleteInvoice);
exports.default = router;
