import { Request, Response } from 'express';
import User from '../models/User';
import speakeasy from 'speakeasy'; // For generating TOTP secrets

// Enable 2FA for a user
export const enable2FA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generate a TOTP secret
    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFASecret = secret.base32;
    user.is2FAEnabled = true;
    await user.save();

    res.status(200).json({ secret: secret.base32 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable 2FA' });
  }
};

// Disable 2FA for a user
export const disable2FA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.twoFASecret = undefined;
    user.is2FAEnabled = false;
    await user.save();

    res.status(200).json({ message: '2FA disabled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disable 2FA' });
  }
};

// Add an IP to the whitelist
export const addWhitelistedIP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, ip } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.whitelistedIPs.includes(ip)) {
      user.whitelistedIPs.push(ip);
      await user.save();
    }

    res.status(200).json({ message: 'IP added to whitelist', whitelistedIPs: user.whitelistedIPs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add IP to whitelist' });
  }
};

// Remove an IP from the whitelist
export const removeWhitelistedIP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, ip } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.whitelistedIPs = user.whitelistedIPs.filter((whitelistedIP) => whitelistedIP !== ip);
    await user.save();

    res.status(200).json({ message: 'IP removed from whitelist', whitelistedIPs: user.whitelistedIPs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove IP from whitelist' });
  }
};