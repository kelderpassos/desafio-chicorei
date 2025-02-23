import { Options } from 'sequelize';
import 'dotenv/config';

const config: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
};

export = config;
