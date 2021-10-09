import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredenciaisDTO } from './dtos/credenciais.dto';
import { UsuarioRepository } from './usuario.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  signUp(credenciaisDTO: CredenciaisDTO) {
    return this.usuarioRepository.insertUsuario(credenciaisDTO);
  }

  async signIn(
    credenciaisDTO: CredenciaisDTO,
  ): Promise<{ accessToken: string }> {
    const { login, senha } = credenciaisDTO;
    const usuario = await this.usuarioRepository.findOne({ login });

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const payload = { login };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Usuário não autorizado.');
    }
  }
}
