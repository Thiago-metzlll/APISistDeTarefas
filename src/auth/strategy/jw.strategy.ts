// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SUA_CHAVE_SECRETA', // mesma chave do JwtModule
    });
  }

  async validate(payload: any) {
    // retorna o usuário validado, que será injetado em req.user
    return this.authService.validateUser(payload.id);
  }
}
