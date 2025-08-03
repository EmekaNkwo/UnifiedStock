import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantDto } from './create-tenant.dto';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
