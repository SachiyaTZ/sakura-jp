import { Request, Response } from 'express';
import Preference from '../models/Preference';

export const updatePreferences = async (req: Request, res: Response): Promise<void> => {
  const { userId, theme, notifications } = req.body;

  try {
    const preferences = await Preference.findOneAndUpdate({ userId }, { theme, notifications }, { new: true, upsert: true });
    res.json({ message: 'Preferences updated successfully', preferences });
  } catch (error) {
    res.status(500).json({ error: 'Error updating preferences' });
  }
};

export const getPreferences = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const preferences = await Preference.findOne({ userId });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching preferences' });
  }
};