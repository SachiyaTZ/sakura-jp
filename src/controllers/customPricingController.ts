import { Request, Response } from 'express';
import CustomPricing from '../models/CustomPricing';

export const setCustomPrice = async (req: Request, res: Response): Promise<void> => {
  const { companyId, productId, price } = req.body;

  try {
    const customPrice = new CustomPricing({ companyId, productId, price });
    await customPrice.save();
    res.status(201).json({ message: 'Custom price set successfully', customPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error setting custom price' });
  }
};