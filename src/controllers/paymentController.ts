import { Request, Response } from 'express';
import PaymentMethod from '../models/PaymentMethod';
import Payment from '../models/Payment';

export const addPaymentMethod = async (req: Request, res: Response): Promise<void> => {
  const { userId, cardNumber, cardHolder, expiryDate, cvv } = req.body;

  try {
    const paymentMethod = new PaymentMethod({ userId, cardNumber, cardHolder, expiryDate, cvv });
    await paymentMethod.save();
    res.status(201).json({ message: 'Payment method added successfully', paymentMethod });
  } catch (error) {
    res.status(500).json({ error: 'Error adding payment method' });
  }
};

export const getPaymentMethods = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const paymentMethods = await PaymentMethod.find({ userId });
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment methods' });
  }
};

export const deletePaymentMethod = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await PaymentMethod.findByIdAndDelete(id);
    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting payment method' });
  }
};

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  const { userId, orderId, amount, paymentMethod } = req.body;

  try {
    const payment = new Payment({ userId, orderId, amount, paymentMethod });
    await payment.save();
    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};