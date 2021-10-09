import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from 'src/auth/usuario.entity';
import { EstoqueDTO } from './dtos/estoque.dto';
import { EstoqueRepository } from './estoque.repository';

@Injectable()
export class EstoqueService {
  constructor(private estoqueRepository: EstoqueRepository) {}

  getAllEstoques() {
    return this.estoqueRepository.getAll();
  }

  getEstoqueById(id: number) {
    return this.estoqueRepository.getById(id);
  }

  getEstoqueByIdUsuario(id: number) {
    return this.estoqueRepository.getByIdUsuario(id);
  }

  insertEstoque(EstoqueDTO: EstoqueDTO, usuario: Usuario) {
    return this.estoqueRepository.insertEstoque(EstoqueDTO, usuario);
  }

  async setEdicao(id) {
    const estoque = await this.getEstoqueById(id);

    if (estoque.emEdicao)
      throw new ConflictException('O estoque já está sendo editado.');

    estoque.emEdicao = true;
    this.estoqueRepository.save(estoque);
  }

  updateEstoque(id: number, estoqueDTO: EstoqueDTO, usuario: Usuario) {
    return this.estoqueRepository.updateEstoque(id, estoqueDTO, usuario);
  }

  deleteEstoque(id: number) {
    return this.estoqueRepository.deleteEstoque(id);
  }
}
