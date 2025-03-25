import { Request, Response } from 'express';
import ReservedStock from '../models/ReservedStock';

export const reserveStock = async (req: Request, res: Response): Promise<void> => {
  const { customerId, productId, quantity } = req.body;

  try {
    const reservedStock = new ReservedStock({ customerId, productId, quantity });
    await reservedStock.save();
    res.status(201).json({ message: 'Stock reserved successfully', reservedStock });
  } catch (error) {
    res.status(500).json({ error: 'Error reserving stock' });
  }
};