import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryStatus } from './inventory-response.dto';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  minStockLevel?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  barcode?: string;

  // @ApiProperty()
  // @IsNumber()
  // @IsOptional()
  // maxStockLevel?: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ enum: InventoryStatus, enumName: 'InventoryStatus' })
  @IsOptional()
  @IsEnum(InventoryStatus)
  status?: InventoryStatus;
}
