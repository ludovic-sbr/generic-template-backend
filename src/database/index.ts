import { Sequelize } from 'sequelize-typescript';
import { Role, User } from '../api/models';
import mysql from 'mysql2/promise';
import { config } from '../common/config/main';
import { LogType, Logger } from '../common/services/logger';

const db = () => {};

db.initialize = async () => {
  try {
    Logger.info('   Create mysql connection to database.', LogType.API);
    const connection = await mysql.createConnection({
      host: config.databaseConfig.host,
      port: config.databaseConfig.port,
      user: config.databaseConfig.user,
      password: config.databaseConfig.password,
    });

    Logger.info('   Create database if not exists.', LogType.API);
    await connection.query(`    CREATE DATABASE IF NOT EXISTS \`${config.databaseConfig.name}\`;`);

    Logger.info('   Instanciation of Sequelize connection.', LogType.API);
    const sequelize = new Sequelize({
      database: config.databaseConfig.name,
      dialect: 'mysql',
      username: config.databaseConfig.user,
      password: config.databaseConfig.password,
      models: [Role, User],
    });

    Logger.info('   Syncing remote database.', LogType.API);
    await sequelize.sync();

    Logger.info('   Database connection has been established successfully.', LogType.API);
  } catch (e) {
    Logger.error(`Unable to connect to the database : ${e}`, LogType.API);
  }
};

export default db;
