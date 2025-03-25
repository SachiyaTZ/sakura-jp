import { Request, Response } from 'express';
import SubCategory from '../models/SubCategory';

// Add SubCategory
export const addSubCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, brandId, categoryId, companyId } = req.body;
  
    try {
      // Validate required fields
      if (!name || !brandId || !categoryId || !companyId) {
        res.status(400).json({ error: 'Missing required fields: name, brandId, categoryId, or companyId' });
        return;
      }
  
      const subCategory = new SubCategory({ name, brandId, categoryId, companyId });
      await subCategory.save();
      res.status(201).json({ message: 'SubCategory added successfully', subCategory });
    } catch (error) {
      console.error('Error adding subCategory:', error);
      res.status(500).json({ error: 'Error adding subCategory' });
    }
};

// Get SubCategory by ID
export const getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const subCategory = await SubCategory.findOne({ _id: id, deleted: false });
    if (!subCategory) {
      res.status(404).json({ error: 'SubCategory not found' });
      return;
    }

    res.status(200).json(subCategory);
  } catch (error) {
    console.error('Error fetching subCategory:', error);
    res.status(500).json({ error: 'Error fetching subCategory' });
  }
};

// Update SubCategory
export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, brandId, categoryId, companyId } = req.body;
  
    try {
      // Validate required fields
      if (!name || !brandId || !categoryId || !companyId) {
        res.status(400).json({ error: 'Missing required fields: name, brandId, categoryId, or companyId' });
        return;
      }
  
      // Update the subcategory
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id,
        { name, brandId, categoryId, companyId },
        { new: true } // Return the updated document
      );
  
      if (!updatedSubCategory) {
        res.status(404).json({ error: 'SubCategory not found' });
        return;
      }
  
      res.status(200).json({ message: 'SubCategory updated successfully', subCategory: updatedSubCategory });
    } catch (error) {
      console.error('Error updating subCategory:', error);
      res.status(500).json({ error: 'Error updating subCategory' });
    }
};

// Soft Delete SubCategory
export const softDeleteSubCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedSubCategory) {
      res.status(404).json({ error: 'SubCategory not found' });
      return;
    }

    res.status(200).json({ message: 'SubCategory soft deleted successfully', subCategory: deletedSubCategory });
  } catch (error) {
    console.error('Error soft deleting subCategory:', error);
    res.status(500).json({ error: 'Error soft deleting subCategory' });
  }
};

// get all subcategories
export const getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const subCategories = await SubCategory.find({ deleted: false });
      res.status(200).json(subCategories);
    } catch (error) {
      console.error('Error fetching subCategories:', error);
      res.status(500).json({ error: 'Error fetching subCategories' });
    }
};