import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  minStockLevel?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxStockLevel?: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
