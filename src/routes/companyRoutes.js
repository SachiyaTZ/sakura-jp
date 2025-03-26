"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/register', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), companyController_1.registerCompany);
// Admin-only routes
router.put('/approve/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), companyController_1.approveCompany);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), companyController_1.getCompanies);
exports.default = router;
