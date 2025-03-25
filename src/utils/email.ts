import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send a verification email
export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
  const verificationLink = `http://localhost:5000/api/users/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address
    subject: 'Verify Your Account', // Email subject
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  const resetLink = `http://localhost:5000/api/users/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address
    subject: 'Password Reset Request', // Email subject
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};