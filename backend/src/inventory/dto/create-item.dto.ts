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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

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
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsOptional()
  minStockLevel?: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsOptional()
  maxStockLevel?: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
