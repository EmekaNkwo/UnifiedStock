import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Role } from './entities/role.enum';
import ResponseHelper from '@/common/helpers/response.helper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
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
      return ResponseHelper.badRequest(error.message);
    }
  }

  @Post('login')
  async login(@Body('username') username: string) {
    const user = await this.authService.validateUser(username);
    const result = await this.authService.login(user);
    if (!user) {
      return ResponseHelper.notFound('User not found');
    }
    return ResponseHelper.success('User logged in successfully', result, 200);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const result = await this.authService.getProfile(req.user.userId);
    return ResponseHelper.success(
      'User profile retrieved successfully',
      result,
      200,
    );
  }
}
