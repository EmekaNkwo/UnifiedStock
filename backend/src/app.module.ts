import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { typeOrmConfig } from './config/typeorm.config';
import { InventoryModule } from './inventory/inventory.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppService } from './app.service';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        ...typeOrmConfig,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    TenantModule,
    InventoryModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
