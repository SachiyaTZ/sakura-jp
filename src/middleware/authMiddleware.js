"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user ID and role to the request object
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
// Authorization middleware
const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
            return;
        }
        next(); // User has the required role, proceed to the next middleware/route
    };
};
exports.authorize = authorize;
