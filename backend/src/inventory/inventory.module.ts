import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './entities/inventory-item.entity';
import { AuthModule } from '@/auth/auth.module';
import { Category } from '@/category/entities/category.entity';
import { CategoryService } from '@/category/category.service';
import { CategoryController } from '@/category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem, Category]), AuthModule],
  controllers: [InventoryController, CategoryController],
  providers: [InventoryService, CategoryService],
  exports: [InventoryService, CategoryService], // If you need to use the service elsewhere
})
export class InventoryModule {}
