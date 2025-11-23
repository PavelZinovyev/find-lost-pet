import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

const userRouter = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };

userRouter.post('/register', asyncHandler(UserController.register));
userRouter.post('/login', asyncHandler(UserController.login));
userRouter.get('/me', asyncHandler(UserController.me));

export default userRouter;
