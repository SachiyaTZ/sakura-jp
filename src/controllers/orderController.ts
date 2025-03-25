import { Request, Response } from 'express';
import Order from '../models/Order';

export const getOrderHistory = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order history' });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId, quantity, totalPrice } = req.body;

  try {
    const order = new Order({ userId, productId, quantity, totalPrice });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

export const trackOrder = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('productId');
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error tracking order' });
  }
};