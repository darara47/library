import * as crypto from 'crypto';

export const generateTokenByString = (text: string): string => {
  const secretKey = process.env.APP_SECRET_KEY;

  return crypto.createHmac('sha256', secretKey).update(text).digest('hex');
};
