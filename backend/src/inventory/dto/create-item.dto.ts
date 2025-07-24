import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  // For multi-tenancy (will be set by the controller)
  tenantId?: string;
}
