import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { Post } from '../models/Post';
import { User } from '../models/User';

export const addUserIdToPosts = async () => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    console.log('🔄 Начинаем миграцию: добавление userId к постам...');

    // Проверяем, существует ли колонка userId
    const tableDescription = await queryInterface.describeTable('Posts');
    const hasUserId = 'userId' in tableDescription;

    if (!hasUserId) {
      // Шаг 1: Добавляем колонку userId как nullable
      console.log('📝 Шаг 1: Добавляем колонку userId (nullable)...');
      await queryInterface.addColumn('Posts', 'userId', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      });
      console.log('✅ Колонка userId добавлена (nullable)');
    } else {
      console.log('ℹ️  Колонка userId уже существует');
    }

    // Шаг 2: Создаем дефолтного пользователя для старых постов
    console.log('📝 Шаг 2: Создаем/находим дефолтного пользователя...');
    const [defaultUser, created] = await User.findOrCreate({
      where: { email: 'system@default.com' },
      defaults: {
        email: 'system@default.com',
        password: 'default_password_hash', // В реальном приложении это должен быть хэш
        name: 'System Default User',
      },
    });
    console.log(
      created ? '✅ Дефолтный пользователь создан' : 'ℹ️  Дефолтный пользователь уже существует'
    );

    // Шаг 3: Присваиваем все посты без userId дефолтному пользователю
    console.log('📝 Шаг 3: Присваиваем существующие посты дефолтному пользователю...');
    const userId = (defaultUser.get('id') as number) || defaultUser.getDataValue('id');
    const updatedCount = await Post.update(
      { userId },
      {
        where: {
          userId: null,
        },
      }
    );
    console.log(`✅ Обновлено постов: ${updatedCount[0]}`);

    // Шаг 4: Делаем колонку userId NOT NULL (только если она еще nullable)
    const currentTableDescription = await queryInterface.describeTable('Posts');
    const userIdColumn = currentTableDescription.userId;

    if (userIdColumn && userIdColumn.allowNull) {
      console.log('📝 Шаг 4: Делаем колонку userId обязательной (NOT NULL)...');
      await queryInterface.changeColumn('Posts', 'userId', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      });
      console.log('✅ Колонка userId теперь обязательная');
    } else {
      console.log('ℹ️  Колонка userId уже обязательная (NOT NULL)');
    }

    console.log('✅ Миграция завершена успешно!');
  } catch (error) {
    console.error('❌ Ошибка при миграции:', error);
    throw error;
  }
};
