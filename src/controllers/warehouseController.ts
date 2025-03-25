import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';

// export const addWarehouse = async (req: Request, res: Response): Promise<void> => {
//   const { name, location } = req.body;

//   try {
//     const warehouse = new Warehouse({ name, location });
//     await warehouse.save();
//     res.status(201).json({ message: 'Warehouse added successfully', warehouse });
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding warehouse' });
//   }
// };

export const addWarehouse = async (req: Request, res: Response): Promise<void> => {
  const { name, location, companyId } = req.body;

  try {
    // Validate required fields
    if (!name || !location || !companyId) {
      res.status(400).json({ error: 'Missing required fields: name, location, or companyId' });
      return;
    }

    const warehouse = new Warehouse({ name, location, companyId });
    await warehouse.save();
    res.status(201).json({ message: 'Warehouse added successfully', warehouse });
  } catch (error) {
    console.error('Error adding warehouse:', error);
    res.status(500).json({ error: 'Error adding warehouse' });
  }
};

export const getWarehouseById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const warehouse = await Warehouse.findOne({ _id: id, deleted: false }); // Exclude soft-deleted warehouses
    if (!warehouse) {
      res.status(404).json({ error: 'Warehouse not found' });
      return;
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.error('Error fetching warehouse:', error);
    res.status(500).json({ error: 'Error fetching warehouse' });
  }
};

export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, location, companyId } = req.body;

  try {
    // Validate required fields
    if (!name || !location || !companyId) {
      res.status(400).json({ error: 'Missing required fields: name, location, or companyId' });
      return;
    }

    // Update the warehouse
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      id,
      { name, location, companyId },
      { new: true } // Return the updated document
    );

    if (!updatedWarehouse) {
      res.status(404).json({ error: 'Warehouse not found' });
      return;
    }

    res.status(200).json({ message: 'Warehouse updated successfully', warehouse: updatedWarehouse });
  } catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({ error: 'Error updating warehouse' });
  }
};

export const softDeleteWarehouse = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Soft delete the warehouse by setting `deleted` to true
    const deletedWarehouse = await Warehouse.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!deletedWarehouse) {
      res.status(404).json({ error: 'Warehouse not found' });
      return;
    }

    res.status(200).json({ message: 'Warehouse soft deleted successfully', warehouse: deletedWarehouse });
  } catch (error) {
    console.error('Error soft deleting warehouse:', error);
    res.status(500).json({ error: 'Error soft deleting warehouse' });
  }
};