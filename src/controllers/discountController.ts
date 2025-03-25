import { Request, Response } from 'express';
import Discount from '../models/Discount';

export const applyDiscount = async (req: Request, res: Response): Promise<void> => {
  const { code, orderId } = req.body;

  try {
    const discount = await Discount.findOne({ code });
    if (!discount || discount.expiryDate < new Date()) {
      res.status(400).json({ error: 'Invalid or expired discount code' });
      return;
    }

    // Apply discount logic here (e.g., update order total)
    res.json({ message: 'Discount applied successfully', discount });
  } catch (error) {
    res.status(500).json({ error: 'Error applying discount' });
  }
};