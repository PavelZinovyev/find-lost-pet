import { Request, Response } from 'express';
import { User } from '../models/User';

import { hashPassword, verifyPassword } from '../utils/password';
import { generateToken, verifyToken } from '../utils/jwt';

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: 'Email, password and name are required' });
        return;
      }

      const isUserExist = await User.findOne({ where: { email } });
      if (isUserExist) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ email, password: hashedPassword, name });
      const userId = user.getDataValue('id') as number;

      const token = generateToken(userId);

      res.status(201).json({ token, user: { id: userId, email } });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'internal server error' });
      return;
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });

        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });

        return;
      }

      const userId = user.getDataValue('id');
      const userPassword = user.getDataValue('password');
      const isPasswordValid = await verifyPassword(password, userPassword);

      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });

        return;
      }

      const token = generateToken(userId);
      res.status(200).json({ token, user: { id: userId, email } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'internal server error' });

      return;
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });

        return;
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });

        return;
      }

      const user = await User.findByPk(decoded.userId);
      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });

        return;
      }

      const userEmail = user.getDataValue('email');
      const userId = user.getDataValue('id');

      res.status(200).json({ user: { id: userId, email: userEmail } });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'internal server error' });

      return;
    }
  }
}
