import express, { Request, Response, NextFunction } from 'express';
import { PostController } from '../controllers/PostController';
import { authMiddleware } from '../middleware/auth';

const postRouter = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };

// GET /posts - публичный, не требует авторизации
postRouter.get('/', asyncHandler(PostController.getPosts));

// POST /posts - требует авторизации
postRouter.post('/', authMiddleware, asyncHandler(PostController.createPost));

export default postRouter;
