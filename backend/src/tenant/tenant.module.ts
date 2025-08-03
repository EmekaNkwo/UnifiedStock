import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { User } from '../auth/entities/user.entity';
import { TenantGuard } from '../guards/tenant.guard';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User]), AuthModule],
  controllers: [TenantController],
  providers: [TenantService, TenantGuard],
  exports: [TenantService, TenantGuard, TypeOrmModule],
})
export class TenantModule {}
