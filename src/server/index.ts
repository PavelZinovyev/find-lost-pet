import { sequelize } from './db';
import { Post } from './models/Post';

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync();
    console.log('✅ Database synced');

    await Post.sync();
    console.log('✅ Post table synced');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
};
