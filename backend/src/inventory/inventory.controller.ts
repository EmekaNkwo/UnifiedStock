import { Controller, Get, Post, UseGuards, Param, Body } from '@nestjs/common';
import { TenantGuard } from '../guards/tenant.guard';
import { InventoryService } from './inventory.service';

@Controller(':tenant/inventory')
@UseGuards(TenantGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Param('tenant') tenant: string) {
    return this.inventoryService.findAll(tenant);
  }

  @Post()
  create(
    @Param('tenant') tenant: string,
    @Body() item: { name: string; quantity: number; price: number },
  ) {
    return this.inventoryService.create(tenant, item);
  }
}
