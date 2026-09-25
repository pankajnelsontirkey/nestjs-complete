import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Report } from './reports/report.entity';
import { User } from './users/user.entity';
import { DataSourceOptions } from 'typeorm/browser';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const isProd = process.env.NODE_ENV === 'production';

const options: DataSourceOptions = isProd
  ? {
      type: 'postgres',
      url: (() => {
        if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set');
        return process.env.DATABASE_URL;
      })(),
      ssl: { rejectUnauthorized: false },
      poolSize: 5,
      entities: [User, Report],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }
  : {
      type: 'better-sqlite3',
      database: (() => {
        if (!process.env.DB_NAME) throw new Error('DB_NAME not set');
        return process.env.DB_NAME;
      })(),
      entities: [User, Report],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    };

export default new DataSource(options);
