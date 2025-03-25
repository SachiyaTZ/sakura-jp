import { Request, Response } from 'express';
import Notification, { INotification } from '../models/notificationModel';

// Create a new notification
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification: INotification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification); // Do not return the result
  } catch (error) {
    res.status(400).send(error); // Do not return the result
  }
};

// Get all notifications for a user
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role } = (req as any).user;
    let query: any = { userId };

    if (role === 'admin' || role === 'manager') {
      query = {}; // No filter for admin/manager
    }

    const notifications = await Notification.find(query);
    res.status(200).send(notifications); // Do not return the result
  } catch (error) {
    res.status(500).send(error); // Do not return the result
  }
};

// Update a notification
export const updateNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) {
      res.status(404).send(); // Do not return the result
      return; // Early exit
    }
    res.status(200).send(notification); // Do not return the result
  } catch (error) {
    res.status(400).send(error); // Do not return the result
  }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      res.status(404).send(); // Do not return the result
      return; // Early exit
    }
    res.status(200).send(notification); // Do not return the result
  } catch (error) {
    res.status(500).send(error); // Do not return the result
  }
};