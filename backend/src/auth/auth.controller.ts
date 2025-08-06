import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Role } from './entities/role.enum';
import ResponseHelper from '@/common/helpers/response.helper';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  LoginDto,
  LoginResponseDto,
  ProfileResponseDto,
  RegisterResponseDto,
  SignUpDto,
} from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: SignUpDto })
  async signup(
    @Body('username') username: string,
    @Body('role') role: Role,
    @Body('tenantName') tenantName: string,
  ) {
    try {
      const result = await this.authService.signup(username, role, tenantName);
      return ResponseHelper.success(
        'User registered successfully',
        result,
        201,
      );
    } catch (error) {
      throw ResponseHelper.badRequest(error.message);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body('username') username: string) {
    try {
      const user = await this.authService.validateUser(username);
      const result = await this.authService.login(user);
      return ResponseHelper.success(
        'User logged in successfully',
        {
          ...result,
        },
        200,
      );
    } catch (error) {
      throw ResponseHelper.badRequest(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: ProfileResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    const result = await this.authService.getProfile(req.user.userId);
    return ResponseHelper.success(
      'User profile retrieved successfully',
      result,
      200,
    );
  }
}
