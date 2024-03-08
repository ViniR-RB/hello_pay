import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/modules/user/domain/user_entity';
import ConfigurationService from './configuration.service';
@Injectable()
export default class JsonWebTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async sign(payload: { sub: string; role: UserRole; type: string }) {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<{
    sub: string;
    role: UserRole;
    iat: string;
    exp: string;
    type: string;
  }> {
    const payload = await this.jwtService.verifyAsync<{
      sub: string;
      role: UserRole;
      iat: string;
      exp: string;
      type: string;
    }>(token, {
      secret: this.configurationService.jwtSecretKey(),
    });
    return payload;
  }
}
