import { Request, Response } from 'express';
import Return from '../models/Return';

export const requestReturn = async (req: Request, res: Response): Promise<void> => {
  const { orderId, reason } = req.body;

  try {
    const returnRequest = new Return({ orderId, reason });
    await returnRequest.save();
    res.status(201).json({ message: 'Return request submitted', returnRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error requesting return' });
  }
};