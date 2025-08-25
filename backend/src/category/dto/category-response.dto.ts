import { UserResponseWithTenantIdDto } from '@/auth/dto/user-response.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  parent?: CategoryResponseDto;

  @ApiProperty()
  parentId?: string;

  @ApiProperty({ type: () => [CategoryResponseDto] })
  children?: CategoryResponseDto[];

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdById?: string;

  @ApiProperty()
  createdBy?: UserResponseWithTenantIdDto;
}

export class InventoryItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  minStockLevel?: number;

  @ApiProperty()
  categoryId?: string;

  @ApiProperty()
  category?: CategoryResponseDto;
}

export class UpdateCategoryResponseDto extends CategoryResponseDto {
  @ApiProperty({ type: () => [InventoryItemDto], required: false })
  items?: InventoryItemDto[];
}

export class CategoryResponseDtoWithoutCreatedBy extends OmitType(
  CategoryResponseDto,
  ['createdBy'] as const,
) {}
