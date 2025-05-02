// import { Request, Response } from 'express';
// import CustomPricing from '../models/CustomPricing';

// export const setCustomPrice = async (req: Request, res: Response): Promise<void> => {
//   const { companyId, productId, price } = req.body;

//   try {
//     const customPrice = new CustomPricing({ companyId, productId, price });
//     await customPrice.save();
//     res.status(201).json({ message: 'Custom price set successfully', customPrice });
//   } catch (error) {
//     res.status(500).json({ error: 'Error setting custom price' });
//   }
// };

import { Request, Response } from 'express';
import CustomPricing from '../models/CustomPricing';
import mongoose from 'mongoose';

export const setCustomPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { customerId, productId, price } = req.body;

    // For managers, force the company to be their assigned company
    const companyId = user.role === 'manager' ? user.companyId : req.body.companyId;

    // Validate manager can only set prices for their company
    if (user.role === 'manager' && req.body.companyId && req.body.companyId !== user.companyId.toString()) {
      res.status(403).json({ error: 'Not authorized to set prices for this company' });
      return;
    }

    const customPrice = new CustomPricing({
      customerId,
      companyId,
      productId,
      price
    });

    await customPrice.save();
    res.status(201).json({ message: 'Custom price set successfully', customPrice });
  } catch (error) {
    console.error('Error setting custom price:', error);
    res.status(500).json({ 
      error: 'Error setting custom price',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCustomPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    let query: any = {};

    // Managers can only see their company's pricing
    if (user.role === 'manager') {
      query.companyId = user.companyId;
    } 
    // Admins can filter by company if specified
    else if (user.role === 'admin' && req.query.companyId) {
      query.companyId = req.query.companyId;
    }

    const pricing = await CustomPricing.find(query)
      .populate('customerId', 'name email')
      .populate('companyId', 'name')
      .populate('productId', 'name price');

    res.status(200).json(pricing);
  } catch (error) {
    console.error('Error fetching custom pricing:', error);
    res.status(500).json({ 
      error: 'Error fetching custom pricing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCustomPriceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const pricing = await CustomPricing.findOne({
      _id: id,
      isDeleted: { $ne: true } // Exclude soft-deleted items
    })
      .populate('customerId', 'name email')
      .populate('companyId', 'name')
      .populate('productId', 'name price');

    if (!pricing) {
      res.status(404).json({ error: 'Custom pricing not found' });
      return;
    }

    // Managers can only access their company's pricing
    if (user.role === 'manager' && pricing.companyId.toString() !== user.companyId.toString()) {
      res.status(403).json({ error: 'Not authorized to view this pricing' });
      return;
    }

    res.status(200).json(pricing);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching custom pricing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateCustomPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { price, companyId } = req.body;

    // First find the existing pricing
    const existingPricing = await CustomPricing.findById(id);

    if (!existingPricing) {
      res.status(404).json({ error: 'Custom pricing not found' });
      return;
    }

    // Managers can only update their company's pricing
    if (user.role === 'manager' && existingPricing.companyId.toString() !== user.companyId.toString()) {
      res.status(403).json({ error: 'Not authorized to update this pricing' });
      return;
    }

    // Prepare update data with proper typing
    const updateData: {
      price: number;
      companyId?: mongoose.Types.ObjectId;
    } = { price };

    // Only allow admin to update companyId
    if (user.role === 'admin' && companyId) {
      updateData.companyId = new mongoose.Types.ObjectId(companyId);
    }

    const updatedPricing = await CustomPricing.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('customerId companyId productId');

    res.status(200).json({
      message: 'Custom pricing updated successfully',
      pricing: updatedPricing
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error updating custom pricing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const softDeleteCustomPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const pricing = await CustomPricing.findById(id);

    if (!pricing) {
      res.status(404).json({ error: 'Custom pricing not found' });
      return;
    }

    // Managers can only delete their company's pricing
    if (user.role === 'manager' && pricing.companyId.toString() !== user.companyId.toString()) {
      res.status(403).json({ error: 'Not authorized to delete this pricing' });
      return;
    }

    // Perform soft delete
    await CustomPricing.findByIdAndUpdate(id, { 
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: user._id
    });

    res.status(200).json({ message: 'Custom pricing soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error deleting custom pricing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};