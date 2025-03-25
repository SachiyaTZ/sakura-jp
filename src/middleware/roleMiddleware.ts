import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = (req as any).user.role;

    if (!roles.includes(userRole)) {
      res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
      return;
    }

    next(); // User has the required role, proceed to the next middleware/route
  };
};