import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
  ) {
    super({
      secretOrKey: 'THAYS',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: { login: string }) {
    const { login } = payload;
    const usuario: Usuario = await this.usuarioRepository.findOne({ login });

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
