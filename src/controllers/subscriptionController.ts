// import { Request, Response } from 'express';
// import Subscription from '../models/Subscription';
// import DropShipping from '../models/DropShipping';

// export const createSubscription = async (req: Request, res: Response): Promise<void> => {
//   const { companyId, productId, quantity, frequency } = req.body;

//   try {
//     const subscription = new Subscription({ companyId, productId, quantity, frequency });
//     await subscription.save();
//     res.status(201).json({ message: 'Subscription created successfully', subscription });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating subscription' });
//   }
// };  

// export const createDropShippingOrder = async (req: Request, res: Response): Promise<void> => {
//   const { supplierId, productId } = req.body;

//   try {
//     const dropShippingOrder = new DropShipping({ supplierId, productId });
//     await dropShippingOrder.save();
//     res.status(201).json({ message: 'Drop shipping order created successfully', dropShippingOrder });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating drop shipping order' });
//   }
// };

import { Request, Response } from 'express';
import Subscription from '../models/Subscription';
import mongoose from 'mongoose';
import DropShipping from '../models/DropShipping';

export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  const { companyId, productId, type } = req.body;

  try {
    // Calculate next billing date based on subscription type
    const nextBillingDate = calculateNextBillingDate(type);
    
    const subscription = new Subscription({ 
      companyId, 
      productId, 
      type,
      nextBillingDate
    });
    
    await subscription.save();
    
    res.status(201).json({ 
      message: 'Subscription created successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ 
      error: 'Error creating subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptions = await Subscription.find({ deleted: false })
      .populate('companyId')
      .populate('productId');
      
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ 
      error: 'Error fetching subscriptions',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getSubscriptionsByType = async (req: Request, res: Response): Promise<void> => {
  const { type } = req.params;

  try {
    if (!['daily', 'weekly', 'monthly', 'annually'].includes(type)) {
      res.status(400).json({ error: 'Invalid subscription type' });
      return;
    }

    const subscriptions = await Subscription.find({ 
      type,
      deleted: false 
    })
    .populate('companyId')
    .populate('productId');
    
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions by type:', error);
    res.status(500).json({ 
      error: 'Error fetching subscriptions by type',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateSubscription = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { type, status } = req.body;

  try {
    const updateData: any = {};
    
    if (type) {
      if (!['daily', 'weekly', 'monthly', 'annually'].includes(type)) {
        res.status(400).json({ error: 'Invalid subscription type' });
        return;
      }
      updateData.type = type;
      updateData.nextBillingDate = calculateNextBillingDate(type);
    }
    
    if (status) {
      if (!['active', 'paused', 'cancelled'].includes(status)) {
        res.status(400).json({ error: 'Invalid subscription status' });
        return;
      }
      updateData.status = status;
    }

    const subscription = await Subscription.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
    .populate('companyId')
    .populate('productId');

    if (!subscription) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Subscription updated successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ 
      error: 'Error updating subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const softDeleteSubscription = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!subscription) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Subscription soft deleted successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Error soft deleting subscription:', error);
    res.status(500).json({ 
      error: 'Error soft deleting subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
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

// Helper function to calculate next billing date
function calculateNextBillingDate(type: string): Date {
  const now = new Date();
  const date = new Date(now);
  
  switch (type) {
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'annually':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      date.setMonth(date.getMonth() + 1); // Default to monthly
  }
  
  return date;
}