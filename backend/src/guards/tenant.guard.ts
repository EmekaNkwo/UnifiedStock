import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const tenantParam = request.params.tenant;

    if (!token) return false;
    const decoded = this.jwtService.verify(token);
    return decoded.tenantId === tenantParam;
  }
}
