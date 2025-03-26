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
exports.bulkExportUsers = exports.bulkImportUsers = exports.resetPassword = exports.forgotPassword = exports.verifyUser = exports.getAllUsers = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const uuid_1 = require("uuid");
const email_1 = require("../utils/email");
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const xlsx_1 = __importDefault(require("xlsx"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate request body
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }
    try {
        // Check if the email already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = (0, uuid_1.v4)(); // Generate a unique token
        const user = new User_1.default({
            email,
            password: hashedPassword,
            verificationToken,
        });
        yield user.save();
        // Send verification email
        try {
            yield (0, email_1.sendVerificationEmail)(email, verificationToken);
        }
        catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // Optionally, delete the user if email sending fails
            yield User_1.default.deleteOne({ email });
            res.status(500).json({ error: 'Error sending verification email' });
            return;
        }
        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    }
    catch (error) {
        console.error('Error registering user:', error); // Log the actual error
        res.status(500).json({ error: 'Error registering user' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield User_1.default.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});
exports.getUserProfile = getUserProfile;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
exports.getAllUsers = getAllUsers;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    try {
        const user = yield User_1.default.findOne({ verificationToken: token });
        if (!user) {
            res.status(400).json({ error: 'Invalid or expired verification link.' });
            return;
        }
        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        yield user.save();
        // Auto-login: Generate a JWT token
        const authToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Redirect or send the token
        res.json({ message: 'Account verified successfully.', token: authToken });
    }
    catch (error) {
        res.status(500).json({ error: 'Error verifying account' });
    }
});
exports.verifyUser = verifyUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Generate a reset token and set expiration (e.g., 1 hour)
        const resetToken = (0, uuid_1.v4)();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        yield user.save();
        // Send reset password email
        yield (0, email_1.sendPasswordResetEmail)(email, resetToken);
        res.json({ message: 'Password reset link sent to your email.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error processing forgot password request' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        const user = yield User_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, // Check if token is not expired
        });
        if (!user) {
            res.status(400).json({ error: 'Invalid or expired reset token.' });
            return;
        }
        // Hash the new password
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined; // Clear the expiration
        yield user.save();
        res.json({ message: 'Password reset successfully.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
});
exports.resetPassword = resetPassword;
const bulkImportUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
    const filePath = req.file.path;
    const users = [];
    try {
        if (filePath.endsWith('.csv')) {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => users.push(row))
                .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                yield User_1.default.insertMany(users);
                res.json({ message: 'Users imported successfully', users });
            }));
        }
        else if (filePath.endsWith('.xlsx')) {
            const workbook = xlsx_1.default.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx_1.default.utils.sheet_to_json(sheet);
            yield User_1.default.insertMany(data);
            res.json({ message: 'Users imported successfully', users: data });
        }
        else {
            res.status(400).json({ error: 'Unsupported file format' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error importing users' });
    }
    finally {
        fs_1.default.unlinkSync(filePath); // Delete the file after processing
    }
});
exports.bulkImportUsers = bulkImportUsers;
const bulkExportUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-password');
        const worksheet = xlsx_1.default.utils.json_to_sheet(users);
        const workbook = xlsx_1.default.utils.book_new();
        xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Users');
        const filePath = './exports/users.xlsx';
        xlsx_1.default.writeFile(workbook, filePath);
        res.download(filePath);
    }
    catch (error) {
        res.status(500).json({ error: 'Error exporting users' });
    }
});
exports.bulkExportUsers = bulkExportUsers;
