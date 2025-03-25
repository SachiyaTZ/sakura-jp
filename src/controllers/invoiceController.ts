// import { Request, Response } from 'express';
// import Invoice from '../models/Invoice';

// export const createInvoice = async (req: Request, res: Response): Promise<void> => {
//   const { companyId, orderId, amount } = req.body;

//   try {
//     const invoice = new Invoice({ companyId, orderId, amount });
//     await invoice.save();
//     res.status(201).json({ message: 'Invoice created successfully', invoice });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating invoice' });
//   }
// };

import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import mongoose from 'mongoose';

// Define a custom error interface to include the `code` property
interface CustomError extends Error {
  code?: number; // Add the `code` property
}

export const createInvoice = async (req: Request, res: Response): Promise<void> => {
  const { companyId, orderId, amount, currency } = req.body;

  try {
    // Validate required fields
    if (!companyId || !orderId || !amount || !currency) {
      res.status(400).json({ error: 'Missing required fields: companyId, orderId, amount, or currency' });
      return;
    }

    // Validate currency (optional, since the schema already enforces enum values)
    const validCurrencies = ['USD', 'EUR', 'INR', 'JPY'];
    if (!validCurrencies.includes(currency)) {
      res.status(400).json({ error: `Invalid currency. Supported currencies are: ${validCurrencies.join(', ')}` });
      return;
    }

    // Create and save the invoice
    const invoice = new Invoice({ companyId, orderId, amount, currency });
    await invoice.save();

    // Send success response
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);

    // Type-cast the error to CustomError
    const err = error as CustomError;

    // Handle specific errors
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      res.status(400).json({ error: err.message });
      return;
    }
    if (err.code === 11000) {
      // Handle duplicate key errors
      res.status(400).json({ error: 'Duplicate invoice detected' });
      return;
    }

    // Handle all other errors
    res.status(500).json({ error: 'Error creating invoice' });
  }
};

export const getInvoiceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findOne({ _id: id, deleted: false }); // Exclude soft-deleted invoices
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Error fetching invoice' });
  }
};

export const updateInvoice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { companyId, orderId, amount, currency, status } = req.body;

  try {
    // Validate required fields
    if (!companyId || !orderId || !amount || !currency || !status) {
      res.status(400).json({ error: 'Missing required fields: companyId, orderId, amount, currency, or status' });
      return;
    }

    // Validate currency
    const validCurrencies = ['USD', 'EUR', 'INR', 'LKR', 'JPY'];
    if (!validCurrencies.includes(currency)) {
      res.status(400).json({ error: `Invalid currency. Supported currencies are: ${validCurrencies.join(', ')}` });
      return;
    }

    // Validate status
    const validStatuses = ['unpaid', 'paid'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `Invalid status. Supported statuses are: ${validStatuses.join(', ')}` });
      return;
    }

    // Update the invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { companyId, orderId, amount, currency, status },
      { new: true } // Return the updated document
    );

    if (!updatedInvoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    res.status(200).json({ message: 'Invoice updated successfully', invoice: updatedInvoice });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Error updating invoice' });
  }
};

export const softDeleteInvoice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Soft delete the invoice by setting `deleted` to true
    const deletedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!deletedInvoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    res.status(200).json({ message: 'Invoice soft deleted successfully', invoice: deletedInvoice });
  } catch (error) {
    console.error('Error soft deleting invoice:', error);
    res.status(500).json({ error: 'Error soft deleting invoice' });
  }
};