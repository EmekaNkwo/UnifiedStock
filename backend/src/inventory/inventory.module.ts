import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './entities/inventory-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService], // If you need to use the service elsewhere
})
export class InventoryModule {}
