import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const validateIP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const clientIP = req.ip || req.connection.remoteAddress || '';
    const whitelistedIPs = user.whitelistedIPs || [];

    if (whitelistedIPs.length > 0 && !whitelistedIPs.includes(clientIP)) {
      res.status(403).json({ error: 'Access denied. IP not whitelisted.' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};