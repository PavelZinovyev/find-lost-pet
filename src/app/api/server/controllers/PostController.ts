import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import { Post } from '../models/Post';

export class PostController {
  static async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.query as { type?: string };

      const where: WhereOptions = {};

      if (type && type !== 'all' && ['lost', 'found'].includes(type)) {
        where.type = type;
      }

      const posts = await Post.findAll({ where });

      res.json(posts);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      console.log('📝 POST /posts - Request received');
      console.log('Request body:', req.body);

      const { title, description, latitude, longitude, type } = req.body;

      if (!title || !description || !latitude || !longitude || !type) {
        console.log('❌ Validation failed: missing fields');
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      if (!['lost', 'found'].includes(type)) {
        console.log('❌ Validation failed: invalid type');
        res.status(400).json({ error: 'Type must be "lost" or "found"' });
        return;
      }

      const userId = req.userId;

      if (!userId) {
        console.log('❌ User ID not found in request');
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      console.log('Creating post with userId:', userId);

      const newPost = await Post.create({
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        type,
        userId,
      });

      console.log('✅ Post created successfully, ID:', newPost.getDataValue('id'));
      res.status(201).json(newPost);
    } catch (e) {
      console.error('❌ Error creating post:', e);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
}
