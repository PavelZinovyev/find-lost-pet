import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Расширяем тип Request для добавления userId
interface RequestWithUserId extends Request {
  userId?: number;
}

/**
 * Middleware для проверки авторизации
 * Извлекает токен из заголовка Authorization и добавляет userId в req
 */
export const authMiddleware = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  try {
    console.log('🔐 Auth middleware - checking authorization');
    console.log('Headers:', req.headers);
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No token provided');
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Invalid token format' });
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
      return;
    }

    req.userId = decoded.userId;
    console.log('✅ Token verified, userId:', decoded.userId);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
