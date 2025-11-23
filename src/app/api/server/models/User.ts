import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: true },
});

export interface IUserProps {
  id: number;
  email: string;
  password: string;
  name: string;
}
