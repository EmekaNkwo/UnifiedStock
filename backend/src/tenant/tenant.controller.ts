import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Tenant } from './entities/tenant.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import ResponseHelper from '@/common/helpers/response.helper';

@ApiTags('tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({
    status: 201,
    description: 'The tenant has been successfully created.',
    type: Tenant,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 409,
    description: 'Tenant with this name already exists.',
  })
  async create(@Body() createTenantDto: CreateTenantDto) {
    const result = await this.tenantService.create(createTenantDto);
    console.log(result);
    return ResponseHelper.success('Tenant created successfully', result, 201);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({
    status: 200,
    description: 'Return all tenants.',
    type: [Tenant],
  })
  async findAll(@Request() req) {
    const result = await this.tenantService.findAll(req.user);
    return ResponseHelper.success('Tenants retrieved successfully', result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a tenant by ID' })
  @ApiResponse({ status: 200, description: 'Return the tenant.', type: Tenant })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const result = await this.tenantService.findOne(id, req.user);
    return ResponseHelper.success('Tenant retrieved successfully', result);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a tenant' })
  @ApiResponse({
    status: 200,
    description: 'The tenant has been successfully updated.',
    type: Tenant,
  })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @ApiResponse({
    status: 409,
    description: 'Tenant with this name already exists.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @Request() req,
  ) {
    const result = await this.tenantService.update(
      id,
      updateTenantDto,
      req.user,
    );
    return ResponseHelper.success('Tenant updated successfully', result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a tenant' })
  @ApiResponse({
    status: 200,
    description: 'The tenant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const result = await this.tenantService.remove(id, req.user);
    return ResponseHelper.success('Tenant deleted successfully', result);
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get a tenant by slug' })
  @ApiResponse({ status: 200, description: 'Return the tenant.', type: Tenant })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  async getTenantBySlug(@Param('slug') slug: string) {
    const result = await this.tenantService.getTenantBySlug(slug);
    return ResponseHelper.success('Tenant retrieved successfully', result);
  }
}
