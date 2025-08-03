import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the inventory item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the item', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Current quantity in stock', minimum: 0 })
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Unit price of the item', minimum: 0 })
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'SKU (Stock Keeping Unit) code',
    required: false,
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    description: 'Minimum stock level for alerts',
    required: false,
    minimum: 0,
  })
  @Min(0)
  @IsNumber()
  @IsOptional()
  minStockLevel?: number;

  @ApiProperty({
    description: 'Maximum stock level',
    required: false,
    minimum: 0,
  })
  @Min(0)
  @IsNumber()
  @IsOptional()
  maxStockLevel?: number;

  @ApiProperty({
    description: 'Category ID for the item',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
