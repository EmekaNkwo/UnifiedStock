import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty({ description: 'Name of the inventory item', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Current quantity in stock',
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'Unit price of the item',
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

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
  @IsNumber()
  @Min(0)
  @IsOptional()
  minStockLevel?: number;

  @ApiProperty({
    description: 'Maximum stock level',
    required: false,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxStockLevel?: number;

  @ApiProperty({ description: 'Category ID for the item', required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
