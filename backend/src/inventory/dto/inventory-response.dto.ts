import { Category } from '@/category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum InventoryStatus {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
}
export class SimpleCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;
}

export class InventoryResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  sku?: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty({
    enum: InventoryStatus,
    enumName: 'InventoryStatus',
    example: InventoryStatus.IN_STOCK,
  })
  status: InventoryStatus;
  @ApiProperty()
  minStockLevel?: number;
  @ApiProperty()
  barcode?: string;

  @ApiProperty()
  categoryId?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: () => SimpleCategoryDto, nullable: true })
  category: SimpleCategoryDto | null;
}

export class InventoryDto {
  @ApiProperty({ type: () => [InventoryResponseDto] })
  data: InventoryResponseDto[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  totalPages: number;
}

export class StockCheckDto {
  @ApiProperty({ type: () => [InventoryResponseDto] })
  lowStock: InventoryResponseDto[];
}

export class InventoryItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  minStockLevel: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => SimpleCategoryDto, nullable: true })
  category: SimpleCategoryDto | null;
}
