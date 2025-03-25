import { Request, Response } from 'express';
import ShippingRate from '../models/ShippingRate';
import Delivery from '../models/Delivery';
import FreightShipping from '../models/FreightShipping';
import DropShipping from '../models/DropShipping';
import CustomShippingAgreement from '../routes/CustomShippingAgreement';

export const getShippingRates = async (req: Request, res: Response): Promise<void> => {
  const { weight, destination } = req.query;

  try {
    // Simulate fetching rates from a carrier API
    const rates = await ShippingRate.find();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shipping rates' });
  }
};

export const trackDelivery = async (req: Request, res: Response): Promise<void> => {
    const { trackingNumber } = req.params;
  
    try {
      const delivery = await Delivery.findOne({ trackingNumber }).populate('orderId');
      if (!delivery) {
        res.status(404).json({ error: 'Delivery not found' });
        return;
      }
  
      res.json(delivery);
    } catch (error) {
      res.status(500).json({ error: 'Error tracking delivery' });
    }
};

export const getFreightShippingOptions = async (req: Request, res: Response): Promise<void> => {
    const { weight, destination } = req.query;
  
    try {
      // Simulate fetching freight options
      const options = await FreightShipping.find();
      res.json(options);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching freight shipping options' });
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

export const createCustomShippingAgreement = async (req: Request, res: Response): Promise<void> => {
    const { companyId, carrier, terms, rate } = req.body;
  
    try {
      const agreement = new CustomShippingAgreement({ companyId, carrier, terms, rate });
      await agreement.save();
      res.status(201).json({ message: 'Custom shipping agreement created successfully', agreement });
    } catch (error) {
      res.status(500).json({ error: 'Error creating custom shipping agreement' });
    }
};