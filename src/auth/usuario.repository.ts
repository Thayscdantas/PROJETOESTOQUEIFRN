import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CredenciaisDTO } from './dtos/credenciais.dto';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
  async insertUsuario(credenciaisDTO: CredenciaisDTO) {
    const { login, senha } = credenciaisDTO;

    const salt = await bcrypt.genSalt();
    const hashedPass: string = await bcrypt.hash(senha, salt);

    const usuario = this.create({ login, senha: hashedPass });
    try {
      return await this.save(usuario);
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('Usuário já existente.');
      else {
        throw error;
      }
    }
  }
}
