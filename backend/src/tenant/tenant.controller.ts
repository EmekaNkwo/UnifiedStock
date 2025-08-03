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

@ApiTags('tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
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
  create(@Body() createTenantDto: CreateTenantDto, @Request() req) {
    return this.tenantService.create(createTenantDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({
    status: 200,
    description: 'Return all tenants.',
    type: [Tenant],
  })
  findAll(@Request() req) {
    return this.tenantService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tenant by ID' })
  @ApiResponse({ status: 200, description: 'Return the tenant.', type: Tenant })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.tenantService.findOne(id, req.user);
  }

  @Patch(':id')
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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @Request() req,
  ) {
    return this.tenantService.update(id, updateTenantDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant' })
  @ApiResponse({
    status: 200,
    description: 'The tenant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.tenantService.remove(id, req.user);
  }
}
