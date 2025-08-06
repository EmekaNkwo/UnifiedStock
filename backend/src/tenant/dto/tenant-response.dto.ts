import { PickType } from '@nestjs/mapped-types';
import { Tenant } from '../entities/tenant.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TenantResponseDto extends PickType(Tenant, [
  'id',
  'name',
  'slug',
] as const) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
