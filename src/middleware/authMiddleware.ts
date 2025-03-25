// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     res.status(401).json({ error: 'Access denied. No token provided.' });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
//     (req as any).user = decoded; // Attach user ID and role to the request object
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// // Authorization middleware
// export const authorize = (roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const userRole = (req as any).user.role;

//     if (!roles.includes(userRole)) {
//       res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
//       return;
//     }

//     next(); // User has the required role, proceed to the next middleware/route
//   };
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    (req as any).user = decoded; // Attach user ID and role to the request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Authorization middleware
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