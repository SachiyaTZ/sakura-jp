import { Request, Response } from 'express';
import Category from '../models/Category';

// Add Category
export const addCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, brandId, companyId } = req.body;
  
    try {
      // Validate required fields
      if (!name || !brandId || !companyId) {
        res.status(400).json({ error: 'Missing required fields: name, brandId, or companyId' });
        return;
      }
  
      const category = new Category({ name, brandId, companyId });
      await category.save();
      res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ error: 'Error adding category' });
    }
  };
// Get Category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ _id: id, deleted: false });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Error fetching category' });
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, brandId, companyId } = req.body;
  
    try {
      // Validate required fields
      if (!name || !brandId || !companyId) {
        res.status(400).json({ error: 'Missing required fields: name, brandId, or companyId' });
        return;
      }
  
      // Update the category
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, brandId, companyId },
        { new: true } // Return the updated document
      );
  
      if (!updatedCategory) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
  
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Error updating category' });
    }
  };

// Soft Delete Category
export const softDeleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category soft deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error('Error soft deleting category:', error);
    res.status(500).json({ error: 'Error soft deleting category' });
  }
};

// Get all Categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await Category.find({ deleted: false });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Error fetching categories' });
    }
};