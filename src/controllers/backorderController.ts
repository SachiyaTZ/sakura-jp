import { Request, Response } from 'express';
import Backorder from '../models/Backorder';

export const createBackorder = async (req: Request, res: Response): Promise<void> => {
  const { productId, quantity } = req.body;

  try {
    const backorder = new Backorder({ productId, quantity });
    await backorder.save();
    res.status(201).json({ message: 'Backorder created successfully', backorder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating backorder' });
  }
};