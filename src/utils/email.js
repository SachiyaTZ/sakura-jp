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
exports.sendPasswordResetEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a transporter object using SMTP
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
});
// Function to send a verification email
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationLink = `http://localhost:5000/api/users/verify?token=${verificationToken}`;
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: 'Verify Your Account', // Email subject
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`, // HTML body
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
// Function to send a password reset email
const sendPasswordResetEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const resetLink = `http://localhost:5000/api/users/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: 'Password Reset Request', // Email subject
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // HTML body
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
