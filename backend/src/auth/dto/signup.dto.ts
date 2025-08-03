import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entities/role.enum';

export class SignUpDto {
  username: string;
  tenantName: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
}
