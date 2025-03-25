// import { Request, Response } from 'express';
// import PurchaseOrder from '../models/PurchaseOrder';

// export const createPurchaseOrder = async (req: Request, res: Response): Promise<void> => {
//   const { companyId, products, totalAmount } = req.body;

//   try {
//     const purchaseOrder = new PurchaseOrder({ companyId, products, totalAmount });
//     await purchaseOrder.save();
//     res.status(201).json({ message: 'Purchase order created successfully', purchaseOrder });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating purchase order' });
//   }
// };

import { Request, Response } from 'express';
import PurchaseOrder from '../models/PurchaseOrder';

// Create Purchase Order
export const createPurchaseOrder = async (req: Request, res: Response): Promise<void> => {
  const { companyId, products, totalAmount } = req.body;

  try {
    // Validate required fields
    if (!companyId || !products || !totalAmount) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const purchaseOrder = new PurchaseOrder({ 
      companyId, 
      products, 
      totalAmount 
    });
    
    await purchaseOrder.save();
    res.status(201).json({ 
      message: 'Purchase order created successfully', 
      purchaseOrder 
    });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    res.status(500).json({ error: 'Error creating purchase order' });
  }
};

// Get All Purchase Orders (excluding soft-deleted)
export const getAllPurchaseOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchaseOrders = await PurchaseOrder.find({ deleted: false })
      .populate('companyId')
      .populate('products.productId');
      
    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ error: 'Error fetching purchase orders' });
  }
};

// Get Purchase Order by ID
export const getPurchaseOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const purchaseOrder = await PurchaseOrder.findOne({ 
      _id: id, 
      deleted: false 
    })
    .populate('companyId')
    .populate('products.productId');

    if (!purchaseOrder) {
      res.status(404).json({ error: 'Purchase order not found' });
      return;
    }

    res.status(200).json(purchaseOrder);
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    res.status(500).json({ error: 'Error fetching purchase order' });
  }
};

// Update Purchase Order
export const updatePurchaseOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { companyId, products, totalAmount, status } = req.body;

  try {
    // Validate required fields
    if (!companyId || !products || !totalAmount) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      { 
        companyId, 
        products, 
        totalAmount,
        status: status || 'pending' 
      },
      { new: true }
    )
    .populate('companyId')
    .populate('products.productId');

    if (!updatedPurchaseOrder) {
      res.status(404).json({ error: 'Purchase order not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Purchase order updated successfully', 
      purchaseOrder: updatedPurchaseOrder 
    });
  } catch (error) {
    console.error('Error updating purchase order:', error);
    res.status(500).json({ error: 'Error updating purchase order' });
  }
};

// Soft Delete Purchase Order (set deleted to true)
export const softDeletePurchaseOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedPurchaseOrder) {
      res.status(404).json({ error: 'Purchase order not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Purchase order soft deleted successfully', 
      purchaseOrder: deletedPurchaseOrder 
    });
  } catch (error) {
    console.error('Error soft deleting purchase order:', error);
    res.status(500).json({ error: 'Error soft deleting purchase order' });
  }
};