import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Not } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.enum';
import ResponseHelper from '@/common/helpers/response.helper';
import {
  InventoryDto,
  InventoryResponseDto,
  InventoryStatus,
} from './dto/inventory-response.dto';

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

  private generateBarcode(): string {
    // Generate 12 random digits
    let barcode = '';
    for (let i = 0; i < 12; i++) {
      barcode += Math.floor(Math.random() * 10).toString();
    }

    // Calculate EAN-13 checksum
    const digits = barcode.split('').map(Number);
    let sum = 0;

    // Sum even and odd positions
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }

    // Calculate check digit
    const checkDigit = (10 - (sum % 10)) % 10;

    // Return 13-digit barcode with check digit
    return barcode + checkDigit.toString();
  }

  private calculateStatus(
    quantity: number,
    minStockLevel: number = 0,
  ): InventoryStatus {
    if (quantity <= 0) {
      return InventoryStatus.OUT_OF_STOCK;
    }
    if (minStockLevel > 0 && quantity <= minStockLevel) {
      return InventoryStatus.LOW_STOCK;
    }
    return InventoryStatus.IN_STOCK;
  }

  private async validateBarcode(
    barcode: string,
    tenantId: string,
    excludeId?: string,
  ): Promise<void> {
    if (!barcode) return;

    const query: any = {
      barcode,
      tenantId,
    };

    if (excludeId) {
      query.id = Not(excludeId);
    }

    const existingItem = await this.itemsRepository.findOne({
      where: query as FindOptionsWhere<InventoryItem>,
    });

    if (existingItem) {
      throw new ConflictException('Barcode already exists');
    }
  }

  async create(
    createItemDto: CreateItemDto,
    tenantId: string,
    user: User,
  ): Promise<InventoryItem> {
    this.checkAdminAccess(user, tenantId);

    // Generate barcode if not provided
    if (!createItemDto.barcode) {
      createItemDto.barcode = this.generateBarcode();
    } else {
      // Check for duplicate barcode
      await this.validateBarcode(createItemDto.barcode, tenantId);
    }

    const item = this.itemsRepository.create({
      ...createItemDto,
      status: this.calculateStatus(
        createItemDto.quantity,
        createItemDto.minStockLevel ?? 0,
      ),
      tenantId,
    });

    return this.itemsRepository.save(item);
  }

  async findAll(
    tenantId: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    status?: InventoryStatus,
    categoryId?: string,
  ): Promise<InventoryDto> {
    const page = Math.max(1, pageNumber);
    const skip = (page - 1) * pageSize;

    const where: any = { tenantId };
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;

    const [items, total] = await this.itemsRepository.findAndCount({
      where,
      relations: ['category'],
      order: { name: 'ASC', createdAt: 'DESC' },
      skip,
      take: pageSize,
    });

    // Transform items to DTOs
    const data = items.map((item) => ({
      ...item,
      category: item.category
        ? {
            id: item.category.id,
            name: item.category.name,
            isActive: item.category.isActive,
          }
        : null,
    })) as unknown as InventoryResponseDto[];

    return {
      data,
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
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
    updateItemDto: CreateItemDto,
    tenantId: string,
    user: User,
  ): Promise<InventoryItem> {
    this.checkAdminAccess(user, tenantId);
    const item = await this.findOne(id, tenantId);

    // Check for duplicate barcode if it's being updated
    if (updateItemDto.barcode && updateItemDto.barcode !== item.barcode) {
      await this.validateBarcode(updateItemDto.barcode, tenantId, id);
    }

    // Recalculate status if quantity or minStockLevel is being updated
    if (
      updateItemDto.quantity !== undefined ||
      updateItemDto.minStockLevel !== undefined
    ) {
      const newQuantity = updateItemDto.quantity ?? item.quantity;
      const newMinStock = updateItemDto.minStockLevel ?? item.minStockLevel;
      updateItemDto.status = this.calculateStatus(newQuantity, newMinStock);
    }

    return this.itemsRepository.save({ ...item, ...updateItemDto });
  }

  // Additional business logic methods
  async checkStockLevels(tenantId: string, user: User) {
    console.log('Checking stock levels for tenant:', tenantId);
    if (user.role !== Role.SUPER_ADMIN && user.tenantId !== tenantId) {
      throw ResponseHelper.forbidden('Access to this tenant is denied');
    }

    const [lowStockItems] = await this.itemsRepository.findAndCount({
      where: {
        tenantId,
        status: InventoryStatus.LOW_STOCK,
      },
    });

    return { lowStock: lowStockItems };
  }

  async remove(id: string, tenantId: string, user: User): Promise<void> {
    this.checkAdminAccess(user, tenantId);
    const item = await this.findOne(id, tenantId);
    await this.itemsRepository.remove(item);
  }

  async updateStatus(
    id: string,
    status: InventoryStatus,
    tenantId: string,
    user: User,
  ): Promise<void> {
    this.checkAdminAccess(user, tenantId);
    const item = await this.findOne(id, tenantId);
    item.status = status;
    await this.itemsRepository.save(item);
  }

  async updateActiveState(
    id: string,
    tenantId: string,
    user: User,
  ): Promise<void> {
    this.checkAdminAccess(user, tenantId);
    const item = await this.findOne(id, tenantId);
    item.isActive = !item.isActive;
    await this.itemsRepository.save(item);
  }
}
