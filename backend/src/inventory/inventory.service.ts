import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private itemsRepository: Repository<InventoryItem>,
  ) {}

  findAll(tenantId: string): Promise<InventoryItem[]> {
    return this.itemsRepository.find({ where: { tenantId } });
  }

  create(
    tenantId: string,
    item: Partial<InventoryItem>,
  ): Promise<InventoryItem> {
    const newItem = this.itemsRepository.create({ ...item, tenantId });
    return this.itemsRepository.save(newItem);
  }
}
