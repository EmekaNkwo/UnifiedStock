import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Role } from '@/auth/entities/role.enum';
import ResponseHelper from '@/common/helpers/response.helper';
import { User } from '@/auth/entities/user.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }

  private checkAdminAccess(user: User): void {
    if (user.role !== Role.SUPER_ADMIN) {
      throw ResponseHelper.forbidden(
        'Only super admins can perform this action',
      );
    }
  }

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // this.checkAdminAccess(user);
    const slug = this.generateSlug(createTenantDto.name);

    // Check if tenant with same name or slug exists
    const existingTenant = await this.tenantRepository.findOne({
      where: [{ name: createTenantDto.name }, { slug }],
    });

    if (existingTenant) {
      throw new ConflictException(
        'Tenant with this name or slug already exists',
      );
    }

    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      slug,
    });
    // console.log(tenant);s

    return this.tenantRepository.save(tenant);
  }

  async findAll(
    user: User,
    page = 1,
    limit = 10,
  ): Promise<{ data: Tenant[]; total: number }> {
    // this.checkAdminAccess(user);
    const [data, total] = await this.tenantRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: string, user: User): Promise<Tenant> {
    // this.checkAdminAccess(user);
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw ResponseHelper.notFound(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }

  async update(
    id: string,
    updateTenantDto: UpdateTenantDto,
    user: User,
  ): Promise<Tenant> {
    // this.checkAdminAccess(user);
    const tenant = await this.findOne(id, user);

    if (updateTenantDto.name && updateTenantDto.name !== tenant.name) {
      const slug = this.generateSlug(updateTenantDto.name);

      // Check if new slug conflicts with existing tenants
      const existingTenant = await this.tenantRepository.findOne({
        where: { slug },
      });

      if (existingTenant && existingTenant.id !== id) {
        throw ResponseHelper.badRequest('Tenant with this name already exists');
      }

      tenant.slug = slug;
    }

    Object.assign(tenant, updateTenantDto);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string, user: User): Promise<void> {
    // this.checkAdminAccess(user);
    const result = await this.tenantRepository.delete(id);
    if (result.affected === 0) {
      throw ResponseHelper.notFound(`Tenant with ID ${id} not found`);
    }
  }

  async getTenantBySlug(slug: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { slug } });
    if (!tenant) {
      throw ResponseHelper.notFound(`Tenant with slug ${slug} not found`);
    }
    return tenant;
  }
}
