import { Sequelize } from 'sequelize';
import { Post } from './models/Post';

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await Post.sync();
    console.log('✅ Post table synced');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
};
