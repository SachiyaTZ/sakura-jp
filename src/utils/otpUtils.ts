import speakeasy from 'speakeasy';

// Generate a TOTP secret
export const generateOTPSecret = (): string => {
  return speakeasy.generateSecret({ length: 20 }).base32;
};

// Verify a TOTP code
export const verifyOTP = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // Allow a 30-second window
  });
};