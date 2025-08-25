import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TenantGuard } from '../guards/tenant.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ResponseHelper } from '../common/helpers/response.helper';
import {
  InventoryDto,
  InventoryItemResponseDto,
  InventoryResponseDto,
  StockCheckDto,
  InventoryStatus,
} from './dto/inventory-response.dto';

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory item' })
  @ApiResponse({
    status: 201,
    description: 'Item created successfully',
    type: InventoryResponseDto,
  })
  async create(@Body() createItemDto: CreateItemDto, @Request() req) {
    const item = await this.inventoryService.create(
      createItemDto,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Item created successfully', item, 201);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory items for the tenant' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Items retrieved successfully',
    type: InventoryDto,
  })
  async findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.inventoryService.findAll(
      req.user.tenantId,
      Number(page),
      Number(limit),
    );
    return ResponseHelper.success('Items retrieved successfully', result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific inventory item' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item retrieved successfully',
    type: InventoryItemResponseDto,
  })
  async findOne(@Param('id') id: string, @Request() req) {
    const item = await this.inventoryService.findOne(id, req.user.tenantId);
    return ResponseHelper.success('Item retrieved successfully', item);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an inventory item' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item updated successfully',
    type: InventoryResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: CreateItemDto,
    @Request() req,
  ) {
    const item = await this.inventoryService.update(
      id,
      updateItemDto,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Item updated successfully', item);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory item' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.inventoryService.remove(id, req.user.tenantId, req.user);
    return ResponseHelper.success('Item deleted successfully');
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of an inventory item' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(InventoryStatus),
          description: 'New status for the inventory item',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Item status updated successfully',
    type: InventoryResponseDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: InventoryStatus,
    @Request() req,
  ) {
    await this.inventoryService.updateStatus(
      id,
      status,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Item status updated successfully');
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Activate an inventory item' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item activated successfully',
    type: InventoryResponseDto,
  })
  async updateActiveState(@Param('id') id: string, @Request() req) {
    await this.inventoryService.updateActiveState(
      id,
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Item activated successfully');
  }

  @Get('stock/check')
  @ApiOperation({ summary: 'Check for low stock items' })
  @ApiResponse({
    status: 200,
    description: 'Stock levels checked successfully',
    type: StockCheckDto,
  })
  async checkStockLevels(@Request() req) {
    console.log('Checking stock levels for tenant:', req.user.tenantId);
    const result = await this.inventoryService.checkStockLevels(
      req.user.tenantId,
      req.user,
    );
    return ResponseHelper.success('Stock levels checked successfully', result);
  }
}
