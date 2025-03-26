"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const securityController_1 = require("../controllers/securityController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(authMiddleware_1.authenticate);
// 2FA Routes
router.post('/users/:userId/enable-2fa', (0, authMiddleware_1.authorize)(['buyer', 'admin', 'manager']), securityController_1.enable2FA);
router.post('/users/:userId/disable-2fa', (0, authMiddleware_1.authorize)(['buyer', 'admin', 'manager']), securityController_1.disable2FA);
// IP Whitelisting Routes
router.post('/users/whitelist-ip', (0, authMiddleware_1.authorize)(['admin', 'manager']), securityController_1.addWhitelistedIP);
router.delete('/users/whitelist-ip', (0, authMiddleware_1.authorize)(['admin', 'manager']), securityController_1.removeWhitelistedIP);
exports.default = router;
