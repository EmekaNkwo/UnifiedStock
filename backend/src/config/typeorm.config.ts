import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { User } from '../auth/entities/user.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { InventoryItem } from '@/inventory/entities/inventory-item.entity';
import { Category } from '@/category/entities/category.entity';

// Load environment variables from .env file
config();

// For TypeORM CLI
const configService = new ConfigService();
const isProduction = configService.get('NODE_ENV') === 'production';

// Configuration object for both NestJS and TypeORM CLI
export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: parseInt(configService.get('DB_PORT') || '5432', 10),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_NAME', 'inventory'),
  entities: [User, Tenant, InventoryItem, Category],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: !isProduction, // Be careful with this in production
  logging: !isProduction,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  relationLoadStrategy: 'join',
};

// This is required for TypeORM CLI
export const dataSource = new DataSource(typeOrmConfig);

// This is for NestJS
export default typeOrmConfig;
