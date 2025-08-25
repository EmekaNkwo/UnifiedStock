import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  parentId?: string | null;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive?: boolean;
}
