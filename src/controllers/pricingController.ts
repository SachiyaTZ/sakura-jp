import { Request, Response } from 'express';
import PricingTier from '../models/PricingTier';

export const addPricingTier = async (req: Request, res: Response): Promise<void> => {
  const { customerType, minVolume, maxVolume, price } = req.body;

  try {
    const pricingTier = new PricingTier({ customerType, minVolume, maxVolume, price });
    await pricingTier.save();
    res.status(201).json({ message: 'Pricing tier added successfully', pricingTier });
  } catch (error) {
    res.status(500).json({ error: 'Error adding pricing tier' });
  }
};

export const getPricingTiers = async (req: Request, res: Response): Promise<void> => {
  try {
    const pricingTiers = await PricingTier.find();
    res.json(pricingTiers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pricing tiers' });
  }
};