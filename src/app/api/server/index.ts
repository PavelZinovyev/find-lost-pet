import { sequelize } from './db';
import { Post } from './models/Post';
import { User } from './models/User';
import { addUserIdToPosts } from './migrations/addUserIdToPosts';

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: false });
    console.log('✅ Database synced');

    await User.sync({ alter: false });
    console.log('✅ User table synced');

    await Post.sync({ alter: false });
    console.log('✅ Post table synced');

    await addUserIdToPosts();
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
};
