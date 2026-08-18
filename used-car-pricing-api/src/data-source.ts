import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Report } from './reports/report.entity';
import { User } from './users/user.entity';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME not set in env file');
}

export default new DataSource({
  type: 'better-sqlite3',
  database: process.env.DB_NAME as string,
  entities: [User, Report],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
