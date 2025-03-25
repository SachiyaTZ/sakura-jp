import { Request, Response } from 'express';
import Address from '../models/Address';

export const addAddress = async (req: Request, res: Response): Promise<void> => {
  const { userId, street, city, state, postalCode, country } = req.body;

  try {
    const address = new Address({ userId, street, city, state, postalCode, country });
    await address.save();
    res.status(201).json({ message: 'Address added successfully', address });
  } catch (error) {
    res.status(500).json({ error: 'Error adding address' });
  }
};

export const getAddresses = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching addresses' });
  }
};

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { street, city, state, postalCode, country } = req.body;

  try {
    const address = await Address.findByIdAndUpdate(id, { street, city, state, postalCode, country }, { new: true });
    res.json({ message: 'Address updated successfully', address });
  } catch (error) {
    res.status(500).json({ error: 'Error updating address' });
  }
};

export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await Address.findByIdAndDelete(id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting address' });
  }
};