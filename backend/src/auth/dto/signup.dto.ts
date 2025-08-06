import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entities/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  tenantName: string;

  @ApiPropertyOptional({ enum: Role, default: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
}
