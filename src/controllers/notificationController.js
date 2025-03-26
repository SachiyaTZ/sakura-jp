"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.updateNotification = exports.getNotifications = exports.createNotification = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
// Create a new notification
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = new notificationModel_1.default(req.body);
        yield notification.save();
        res.status(201).send(notification); // Do not return the result
    }
    catch (error) {
        res.status(400).send(error); // Do not return the result
    }
});
exports.createNotification = createNotification;
// Get all notifications for a user
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.user;
        let query = { userId };
        if (role === 'admin' || role === 'manager') {
            query = {}; // No filter for admin/manager
        }
        const notifications = yield notificationModel_1.default.find(query);
        res.status(200).send(notifications); // Do not return the result
    }
    catch (error) {
        res.status(500).send(error); // Do not return the result
    }
});
exports.getNotifications = getNotifications;
// Update a notification
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) {
            res.status(404).send(); // Do not return the result
            return; // Early exit
        }
        res.status(200).send(notification); // Do not return the result
    }
    catch (error) {
        res.status(400).send(error); // Do not return the result
    }
});
exports.updateNotification = updateNotification;
// Delete a notification
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationModel_1.default.findByIdAndDelete(req.params.id);
        if (!notification) {
            res.status(404).send(); // Do not return the result
            return; // Early exit
        }
        res.status(200).send(notification); // Do not return the result
    }
    catch (error) {
        res.status(500).send(error); // Do not return the result
    }
});
exports.deleteNotification = deleteNotification;
