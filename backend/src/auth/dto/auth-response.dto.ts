import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';
import { Role } from '../entities/role.enum';

export class LoginResponseDto {
  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
  @ApiProperty()
  access_token: string;
}

export class ProfileResponseDto {
  @ApiProperty({ type: () => UserResponseDto })
  data: UserResponseDto;
}

export class RegisterResponseDto {
  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;

  @ApiProperty()
  access_token: string;
}

export class LoginDto {
  @ApiProperty()
  username: string;
}

export class SignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  tenantName: string;
}
