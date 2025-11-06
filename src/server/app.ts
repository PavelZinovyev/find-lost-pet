import express from 'express';
import { initDb } from './index';
import { Post } from './models/Post';

const app = express();
app.use(express.json());

// тестовый маршрут
app.get('/', (req, res) => res.send('Server is running!'));

// создать пост
app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// запускаем сервер после инициализации базы
const PORT = 4000;
initDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
