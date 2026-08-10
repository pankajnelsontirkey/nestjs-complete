import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'better-sqlite3',
      synchronize: this.configService.get<string>('NODE_ENV') !== 'production',
      database: this.configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
    };
  }
}
