"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouseController_1 = require("../controllers/warehouseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only route
// router.post('/', authenticate, authorize(['admin']), addWarehouse);
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), warehouseController_1.addWarehouse);
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), warehouseController_1.getWarehouseById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), warehouseController_1.updateWarehouse);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), warehouseController_1.softDeleteWarehouse);
exports.default = router;
