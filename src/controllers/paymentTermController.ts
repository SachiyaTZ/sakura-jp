import { Request, Response } from 'express';
import PaymentTerm from '../models/PaymentTerm';

export const setPaymentTerm = async (req: Request, res: Response): Promise<void> => {
  const { companyId, term } = req.body;

  try {
    const paymentTerm = new PaymentTerm({ companyId, term });
    await paymentTerm.save();
    res.status(201).json({ message: 'Payment term set successfully', paymentTerm });
  } catch (error) {
    res.status(500).json({ error: 'Error setting payment term' });
  }
};