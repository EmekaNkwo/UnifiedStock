import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['tenant'],
    });
    return user || null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      tenantId: user.tenant.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          slug: user.tenant.slug,
        },
      },
    };
  }

  async signup(username: string, role: Role, tenantName: string) {
    // Check if username is already taken
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Invalid role specified');
    }

    // Create or find tenant
    const tenantSlug = tenantName.toLowerCase().replace(/\s+/g, '-');
    let tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      tenant = this.tenantRepository.create({
        name: tenantName,
        slug: tenantSlug,
      });
      await this.tenantRepository.save(tenant);
    }

    // Create user
    const user = this.usersRepository.create({
      username,
      role,
      tenant,
    });

    await this.usersRepository.save(user);

    // Reload the user with tenant relation before logging in
    const savedUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['tenant'],
    });

    return this.login(savedUser);
  }
  async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['tenant'],
      select: ['id', 'username', 'role', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug,
      },
    };
  }
}
