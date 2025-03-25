import { Request, Response } from 'express';
import RFQ from '../models/RFQ';

export const createRFQ = async (req: Request, res: Response): Promise<void> => {
  const { companyId, products } = req.body;

  try {
    const rfq = new RFQ({ companyId, products });
    await rfq.save();
    res.status(201).json({ message: 'RFQ created successfully', rfq });
  } catch (error) {
    res.status(500).json({ error: 'Error creating RFQ' });
  }
};