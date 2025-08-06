import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { TenantResponseDto } from '../../tenant/dto/tenant-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.enum';

export class UserResponseDto extends PickType(User, [
  'id',
  'username',
  'role',
] as const) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({ type: () => TenantResponseDto })
  tenant: TenantResponseDto;
}

export class UserResponseWithTenantIdDto extends PickType(User, [
  'id',
  'username',
  'role',
  'tenantId',
] as const) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  tenantId: string;
}
