import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'SUA_CHAVE_SECRETA',
    });
  }

  async validate(payload: any) {
    // ⚠ MUITO IMPORTANTE:
    // payload já contém { id, email, role }
    // mas você está removendo o role aqui!
    return this.authService.validateUser(payload.id);
  }
}
