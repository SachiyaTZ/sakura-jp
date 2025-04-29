import { Request, Response } from 'express';
import Brand from '../models/Brand';
import mongoose from 'mongoose';

// // Add Brand
// export const addBrand = async (req: Request, res: Response): Promise<void> => {
//   const { name, companyId } = req.body;

//   try {
//     if (!name || !companyId) {
//       res.status(400).json({ error: 'Missing required fields: name or companyId' });
//       return;
//     }

//     const brand = new Brand({ name, companyId });
//     await brand.save();
//     res.status(201).json({ message: 'Brand added successfully', brand });
//   } catch (error) {
//     console.error('Error adding brand:', error);
//     res.status(500).json({ error: 'Error adding brand' });
//   }
// };

// // Get Brand by ID
// export const getBrandById = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const brand = await Brand.findOne({ _id: id, deleted: false });
//     if (!brand) {
//       res.status(404).json({ error: 'Brand not found' });
//       return;
//     }

//     res.status(200).json(brand);
//   } catch (error) {
//     console.error('Error fetching brand:', error);
//     res.status(500).json({ error: 'Error fetching brand' });
//   }
// };

// // Update Brand
// export const updateBrand = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { name, companyId } = req.body;

//   try {
//     if (!name || !companyId) {
//       res.status(400).json({ error: 'Missing required fields: name or companyId' });
//       return;
//     }

//     const updatedBrand = await Brand.findByIdAndUpdate(
//       id,
//       { name, companyId },
//       { new: true }
//     );

//     if (!updatedBrand) {
//       res.status(404).json({ error: 'Brand not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
//   } catch (error) {
//     console.error('Error updating brand:', error);
//     res.status(500).json({ error: 'Error updating brand' });
//   }
// };

// // Soft Delete Brand
// export const softDeleteBrand = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const deletedBrand = await Brand.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );

//     if (!deletedBrand) {
//       res.status(404).json({ error: 'Brand not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Brand soft deleted successfully', brand: deletedBrand });
//   } catch (error) {
//     console.error('Error soft deleting brand:', error);
//     res.status(500).json({ error: 'Error soft deleting brand' });
//   }
// };

// // Get All Brands
// export const getAllBrands = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const brands = await Brand.find({ deleted: false });
//       res.status(200).json(brands);
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//       res.status(500).json({ error: 'Error fetching brands' });
//     }
// };

// Add Brand - companyId is now optional
export const addBrand = async (req: Request, res: Response): Promise<void> => {
  const { name, companyId } = req.body;

  try {
    if (!name) { // Only name is required now
      res.status(400).json({ error: 'Missing required field: name' });
      return;
    }

    // Validate companyId if provided
    if (companyId && !mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ error: 'Invalid companyId format' });
      return;
    }

    const brand = new Brand({ name, companyId });
    await brand.save();
    res.status(201).json({ message: 'Brand added successfully', brand });
  } catch (error) {
    console.error('Error adding brand:', error);
    res.status(500).json({ error: 'Error adding brand' });
  }
};

// Get Brand by ID - No changes needed
export const getBrandById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const brand = await Brand.findOne({ _id: id, deleted: false });
    if (!brand) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Error fetching brand' });
  }
};

// Update Brand - companyId is now optional
export const updateBrand = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, companyId } = req.body;

  try {
    if (!name) { // Only name is required now
      res.status(400).json({ error: 'Missing required field: name' });
      return;
    }

    // Validate companyId if provided
    if (companyId && !mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ error: 'Invalid companyId format' });
      return;
    }

    const updateData: { name: string; companyId?: mongoose.Types.ObjectId } = { name };
    if (companyId) {
      updateData.companyId = companyId;
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedBrand) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Error updating brand' });
  }
};

// Soft Delete Brand - No changes needed
export const softDeleteBrand = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedBrand) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    res.status(200).json({ message: 'Brand soft deleted successfully', brand: deletedBrand });
  } catch (error) {
    console.error('Error soft deleting brand:', error);
    res.status(500).json({ error: 'Error soft deleting brand' });
  }
};

// Get All Brands - No changes needed
export const getAllBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await Brand.find({ deleted: false });
    res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Error fetching brands' });
  }
};