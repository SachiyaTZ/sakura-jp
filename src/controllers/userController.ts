import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email';
import fs from 'fs';
import csv from 'csv-parser';
import xlsx from 'xlsx';

interface UserImportRow {
  email: string;
  password: string;
  role?: string;
  isVerified?: boolean;
  is2FAEnabled?: boolean;
}

// export const bulkImportUsers = async (req: Request, res: Response): Promise<void> => {
//     if (!req.file) {
//       res.status(400).json({ error: 'No file uploaded' });
//       return;
//     }
  
//     const filePath = req.file.path;
//     const users: any[] = [];
  
//     try {
//       if (filePath.endsWith('.csv')) {
//         fs.createReadStream(filePath)
//           .pipe(csv())
//           .on('data', (row) => users.push(row))
//           .on('end', async () => {
//             await User.insertMany(users);
//             res.json({ message: 'Users imported successfully', users });
//           });
//       } else if (filePath.endsWith('.xlsx')) {
//         const workbook = xlsx.readFile(filePath);
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = xlsx.utils.sheet_to_json(sheet);
//         await User.insertMany(data);
//         res.json({ message: 'Users imported successfully', users: data });
//       } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error importing users' });
//     } finally {
//       fs.unlinkSync(filePath); // Delete the file after processing
//     }
// };

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4(); // Generate a unique token

    const user = new User({
      email,
      password: hashedPassword,
      verificationToken,
    });

    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Optionally, delete the user if email sending fails
      await User.deleteOne({ email });
      res.status(500).json({ error: 'Error sending verification email' });
      return;
    }

    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the actual error
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.query;
  
    try {
      const user = await User.findOne({ verificationToken: token });
  
      if (!user) {
        res.status(400).json({ error: 'Invalid or expired verification link.' });
        return;
      }
  
      // Mark the user as verified
      user.isVerified = true;
      user.verificationToken = undefined; // Clear the token
      await user.save();
  
      // Auto-login: Generate a JWT token
      const authToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      // Redirect or send the token
      res.json({ message: 'Account verified successfully.', token: authToken });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying account' });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // Generate a reset token and set expiration (e.g., 1 hour)
      const resetToken = uuidv4();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
      await user.save();
  
      // Send reset password email
      await sendPasswordResetEmail(email, resetToken);
  
      res.json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
      res.status(500).json({ error: 'Error processing forgot password request' });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }, // Check if token is not expired
      });
  
      if (!user) {
        res.status(400).json({ error: 'Invalid or expired reset token.' });
        return;
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined; // Clear the reset token
      user.resetPasswordExpires = undefined; // Clear the expiration
      await user.save();
  
      res.json({ message: 'Password reset successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error resetting password' });
    }
};

export const bulkImportUsers = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const filePath = req.file.path;
  const users: UserImportRow[] = [];

  try {
    if (filePath.endsWith('.csv')) {
      // Process CSV
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row: unknown) => {
            // Type assertion and validation
            const userRow = row as UserImportRow;
            
            // Validate required fields
            if (!userRow.email || !userRow.password) {
              reject(new Error('Missing required fields (email or password) in some rows'));
              return;
            }
            users.push(userRow);
          })
          .on('end', resolve)
          .on('error', (error: Error) => reject(error));
      });
    } else if (filePath.endsWith('.xlsx')) {
      // Process Excel
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json<UserImportRow>(sheet);
      
      // Validate required fields
      for (const row of data) {
        if (!row.email || !row.password) {
          throw new Error('Missing required fields (email or password) in some rows');
        }
      }
      users.push(...data);
    } else {
      res.status(400).json({ error: 'Unsupported file format. Please upload CSV or Excel.' });
      return;
    }
    
    // Hash passwords before saving
    const usersToSave = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
        isVerified: user.isVerified ?? true, // Default to true if not specified
        role: user.role || 'buyer', // Default role
        is2FAEnabled: user.is2FAEnabled || false // Default to false
      };
    }));
    
    await User.insertMany(usersToSave);
    res.json({ 
      message: 'Users imported successfully',
      count: usersToSave.length
    });
  } catch (error: unknown) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ 
      error: 'Error importing users',
      details: errorMessage 
    });
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export const bulkExportUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find().select('-password');
      const worksheet = xlsx.utils.json_to_sheet(users);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
      const filePath = './exports/users.xlsx';
      xlsx.writeFile(workbook, filePath);
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ error: 'Error exporting users' });
    }
};