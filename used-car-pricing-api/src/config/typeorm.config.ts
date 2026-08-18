import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    if (isProd) {
      return {
        type: 'postgres',
        url: this.configService.get<string>('DATABASE_URL'),
        entities: ['**/*.entity.js'],
        ssl: { rejectUnauthorized: false },
      };
    }

    return {
      type: 'better-sqlite3',
      database: this.configService.get<string>('DB_NAME'),
      synchronize: this.configService.get<string>('NODE_ENV') !== 'production',
      migrationsRun: true,
      entities: ['**/*.entity.ts'],
      autoLoadEntities: true,
    };
  }
}
