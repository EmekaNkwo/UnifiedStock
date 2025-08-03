import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../tenant/entities/tenant.entity';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const tenantSlug = request.params.tenant;

    if (!token) return false;

    try {
      // Get tenant from the token
      const decoded = this.jwtService.verify(token);
      const userTenantId = decoded.tenantId;

      if (!userTenantId) return false;

      // If no tenant slug in URL, allow access (for routes that don't require tenant in path)
      if (!tenantSlug) return true;

      // Find tenant by slug from URL
      const tenant = await this.tenantRepository.findOne({
        where: { slug: tenantSlug },
        select: ['id'],
      });

      // Compare tenant IDs
      const hasAccess = tenant?.id === userTenantId;

      // Attach tenant ID to request for later use
      if (hasAccess) {
        request.tenantId = userTenantId;
      }

      return hasAccess;
    } catch (error) {
      return false;
    }
  }
}
