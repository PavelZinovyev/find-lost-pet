import express from 'express';
import cors from 'cors';

import { initDb } from './index';

import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/auth', userRouter);
app.use('/posts', postRouter);

console.log('✅ Auth routes registered: /auth/register, /auth/login, /auth/me');
console.log('✅ Posts routes registered: GET /posts, POST /posts');

app.get('/', (req, res) => res.send('Server is running!'));

const PORT = 4000;
initDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
