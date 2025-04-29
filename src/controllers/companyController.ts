import { Request, Response } from 'express';
import Company from '../models/Company';
import mongoose from 'mongoose';

interface CustomError extends Error {
  code?: number;
}

export const registerCompany = async (req: Request, res: Response): Promise<void> => {
  const { name, email, address, phone } = req.body;

  console.log('Request body:', req.body); // Log the request body

  try {
    // Check for duplicate email
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      res.status(400).json({ error: 'A company with this email already exists.' });
      return;
    }

    const company = new Company({ name, email, address, phone, status: 'pending' });
    await company.save();
    res.status(201).json({ message: 'Company registration request submitted. Awaiting admin approval.', company });
  } catch (error) {
    console.error('Error registering company:', error); // Log the full error object

    const err = error as CustomError; // Type assertion

    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      // Handle duplicate key errors (e.g., duplicate email)
      res.status(400).json({ error: 'A company with this email already exists.' });
    } else {
      res.status(500).json({ error: 'Error registering company' });
    }
  }
};

export const approveCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(id, { status, adminNotes }, { new: true });
    res.json({ message: 'Company status updated', company });
  } catch (error) {
    res.status(500).json({ error: 'Error updating company status' });
  }
};

export const getCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userRole = (req as any).user.role; 

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid company ID format' });
      return;
    }

    const company = await Company.findById(id).select('-__v'); 

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    if (userRole === 'manager' && company.status !== 'approved') {
      res.status(403).json({ error: 'Access denied. Only approved companies are visible to managers.' });
      return;
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ 
      error: 'Error fetching company details',
      details: errorMessage 
    });
  }
};