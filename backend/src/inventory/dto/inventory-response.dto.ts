import { ApiProperty } from '@nestjs/swagger';

export class InventoryResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  sku?: string;
  @ApiProperty()
  minStockLevel?: number;
  @ApiProperty()
  categoryId?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class StockCheckDto {
  @ApiProperty({ type: () => [InventoryResponseDto] })
  lowStock: InventoryResponseDto[];
}
