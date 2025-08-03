import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthModule } from '@/auth/auth.module';
import { InventoryItem } from '@/inventory/entities/inventory-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, InventoryItem]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService, TypeOrmModule], // Export if needed by other modules
})
export class CategoryModule {}
