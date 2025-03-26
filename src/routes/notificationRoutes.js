"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.post('/notifications', (0, authMiddleware_1.authorize)(['admin', 'manager']), notificationController_1.createNotification);
router.get('/notifications/:userId', (0, authMiddleware_1.authorize)(['buyer', 'admin', 'manager']), notificationController_1.getNotifications);
router.put('/notifications/:id', (0, authMiddleware_1.authorize)(['admin', 'manager']), notificationController_1.updateNotification);
router.delete('/notifications/:id', (0, authMiddleware_1.authorize)(['admin', 'manager']), notificationController_1.deleteNotification);
exports.default = router;
