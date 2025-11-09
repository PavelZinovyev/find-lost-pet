import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  latitude: { type: DataTypes.FLOAT, allowNull: false },
  longitude: { type: DataTypes.FLOAT, allowNull: false },
  type: {
    type: DataTypes.ENUM('lost', 'found'),
    allowNull: false,
  },
});
