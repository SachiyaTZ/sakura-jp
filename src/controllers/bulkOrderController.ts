import { Request, Response } from 'express';
import BulkOrder from '../models/BulkOrder';

export const createBulkOrder = async (req: Request, res: Response): Promise<void> => {
  const { companyId, products, totalAmount } = req.body;

  try {
    const bulkOrder = new BulkOrder({ companyId, products, totalAmount });
    await bulkOrder.save();
    res.status(201).json({ message: 'Bulk order created successfully', bulkOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating bulk order' });
  }
};