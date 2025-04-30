import { Request, Response } from 'express';
import SubscriptionPlan from '../models/SubscriptionPlan';
import mongoose from 'mongoose';

export const createSubscriptionPlan = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description, billingCycle, features } = req.body;

  try {
    const subscriptionPlan = new SubscriptionPlan({
      name,
      price,
      description,
      billingCycle,
      features: features || []
    });

    await subscriptionPlan.save();
    
    res.status(201).json({
      message: 'Subscription plan created successfully',
      subscriptionPlan
    });
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    res.status(500).json({
      error: 'Error creating subscription plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllSubscriptionPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptionPlans = await SubscriptionPlan.find({ deleted: false });
    res.status(200).json(subscriptionPlans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    res.status(500).json({
      error: 'Error fetching subscription plans',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getSubscriptionPlanById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid subscription plan ID' });
      return;
    }

    const subscriptionPlan = await SubscriptionPlan.findOne({ 
      _id: id, 
      deleted: false 
    });

    if (!subscriptionPlan) {
      res.status(404).json({ error: 'Subscription plan not found' });
      return;
    }

    res.status(200).json(subscriptionPlan);
  } catch (error) {
    console.error('Error fetching subscription plan:', error);
    res.status(500).json({
      error: 'Error fetching subscription plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateSubscriptionPlan = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, description, billingCycle, features, isActive } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid subscription plan ID' });
      return;
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (description) updateData.description = description;
    if (billingCycle) updateData.billingCycle = billingCycle;
    if (features) updateData.features = features;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;

    const subscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!subscriptionPlan) {
      res.status(404).json({ error: 'Subscription plan not found' });
      return;
    }

    res.status(200).json({
      message: 'Subscription plan updated successfully',
      subscriptionPlan
    });
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    res.status(500).json({
      error: 'Error updating subscription plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const softDeleteSubscriptionPlan = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid subscription plan ID' });
      return;
    }

    const subscriptionPlan = await SubscriptionPlan.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!subscriptionPlan) {
      res.status(404).json({ error: 'Subscription plan not found' });
      return;
    }

    res.status(200).json({
      message: 'Subscription plan soft deleted successfully',
      subscriptionPlan
    });
  } catch (error) {
    console.error('Error soft deleting subscription plan:', error);
    res.status(500).json({
      error: 'Error soft deleting subscription plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};