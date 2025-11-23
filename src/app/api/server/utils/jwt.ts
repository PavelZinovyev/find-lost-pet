import jwt from 'jsonwebtoken';

export const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'; // todo
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, secret) as { userId: number };
    return decoded;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
};
