import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this.logger.log('JwtStrategy initialized');
  }

  async validate(payload: any) {
    this.logger.debug('=== JWT Payload Validation ===');
    this.logger.debug('Raw JWT Payload:', JSON.stringify(payload, null, 2));

    if (!payload.sub) {
      this.logger.error('Missing sub (user id) in JWT payload');
      return null;
    }

    if (!payload.tenantId) {
      this.logger.error('Missing tenantId in JWT payload');
      return null;
    }

    const user = {
      id: payload.sub,
      userId: payload.sub,
      username: payload.username,
      tenantId: payload.tenantId,
      role: payload.role || 'USER', // Default to USER if role is not specified
    };

    this.logger.debug('Validated User:', JSON.stringify(user, null, 2));
    this.logger.debug('=== End JWT Validation ===');

    return user;
  }
}
