import { Request, Response } from 'express';
import Subscription from '../models/Subscription';
import DropShipping from '../models/DropShipping';

export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  const { companyId, productId, quantity, frequency } = req.body;

  try {
    const subscription = new Subscription({ companyId, productId, quantity, frequency });
    await subscription.save();
    res.status(201).json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
};  

export const createDropShippingOrder = async (req: Request, res: Response): Promise<void> => {
  const { supplierId, productId } = req.body;

  try {
    const dropShippingOrder = new DropShipping({ supplierId, productId });
    await dropShippingOrder.save();
    res.status(201).json({ message: 'Drop shipping order created successfully', dropShippingOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating drop shipping order' });
  }
};