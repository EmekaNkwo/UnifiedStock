import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.enum';
import ResponseHelper from '@/common/helpers/response.helper';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly itemsRepository: Repository<InventoryItem>,
  ) {}

  private checkAdminAccess(user: User, tenantId: string): void {
    // Super admins have access to all tenants
    if (user.role === Role.SUPER_ADMIN) {
      console.log('Access granted: SUPER_ADMIN');
      return;
    }

    // Tenant admins only have access to their own tenant
    if (user.role === Role.TENANT_ADMIN && user.tenantId === tenantId) {
      console.log('Access granted: TENANT_ADMIN for same tenant');
      return;
    }

    console.log('Access denied: Insufficient permissions');
    throw ResponseHelper.forbidden('Insufficient permissions');
  }

  async create(
    createItemDto: CreateItemDto,
    tenantId: string,
    user: User,
  ): Promise<InventoryItem> {
    this.checkAdminAccess(user, tenantId);
    const item = this.itemsRepository.create({
      ...createItemDto,
      tenantId,
    });
    return this.itemsRepository.save(item);
  }

  async findAll(tenantId: string): Promise<InventoryItem[]> {
    return this.itemsRepository.find({
      where: { tenantId },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<InventoryItem> {
    const item = await this.itemsRepository.findOne({
      where: { id, tenantId } as unknown as FindOptionsWhere<InventoryItem>,
    });
    if (!item) {
      throw ResponseHelper.notFound(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto,
    tenantId: string,
    user: User,
  ): Promise<InventoryItem> {
    this.checkAdminAccess(user, tenantId);
    const item = await this.findOne(id, tenantId);
    return this.itemsRepository.save({ ...item, ...updateItemDto });
  }

  async remove(id: string, tenantId: string, user: User): Promise<void> {
    this.checkAdminAccess(user, tenantId);
    const result = await this.itemsRepository.delete({
      id,
      tenantId,
    } as unknown as FindOptionsWhere<InventoryItem>);
    if (result.affected === 0) {
      throw ResponseHelper.notFound(`Item with ID ${id} not found`);
    }
  }

  // Additional business logic methods
  async checkStockLevels(
    tenantId: string,
    user: User,
  ): Promise<{ lowStock: InventoryItem[] }> {
    console.log('Checking stock levels for tenant:', tenantId);
    if (user.role !== Role.SUPER_ADMIN && user.tenantId !== tenantId) {
      throw ResponseHelper.forbidden('Access to this tenant is denied');
    }
    const items = await this.itemsRepository
      .createQueryBuilder('item')
      .where('item.tenantId = :tenantId', { tenantId })
      .andWhere('item.quantity <= item.minStockLevel')
      .getMany();

    return { lowStock: items };
  }
}
