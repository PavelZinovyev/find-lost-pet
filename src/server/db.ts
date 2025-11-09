import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'find_lost_pets',
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);
