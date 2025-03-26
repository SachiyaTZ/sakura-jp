"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
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
