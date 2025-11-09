import express from 'express';
import cors from 'cors';

import { initDb } from './index';
import { Post } from './models/Post';
import { WhereOptions } from 'sequelize';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running!'));

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// получить посты
app.get('/posts', async (req, res) => {
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
});

app.post('/posts', async (req, res) => {
  try {
    const { title, description, latitude, longitude, type } = req.body;

    if (!title || !description || !latitude || !longitude || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newPost = await Post.create({
      title,
      description,
      latitude,
      longitude,
      type,
    });

    return res.status(201).json(newPost);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'failed to create a new post' });
  }
});

const PORT = 4000;
initDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
