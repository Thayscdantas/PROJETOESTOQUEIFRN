import { ConflictException, NotFoundException } from '@nestjs/common';
import { time } from 'console';
import { Usuario } from 'src/auth/usuario.entity';
import { EntityRepository, Repository } from 'typeorm';
import { EstoqueDTO } from './dtos/estoque.dto';
import { Estoque } from './estoque.entity';

@EntityRepository(Estoque)
export class EstoqueRepository extends Repository<Estoque> {
  async getAll() {
    const retorno = await this.createQueryBuilder('estoque').getMany();

    if (retorno.length == 0) {
      throw new NotFoundException('Nenhum estoque foi encontrado.');
    }

    return retorno;
  }

  async getById(id) {
    const retorno = await this.findOne(id);

    if (!retorno) {
      throw new NotFoundException('O estoque não foi encontrado.');
    }

    return retorno;
  }

  async getByIdUsuario(id) {
    const retorno = await this.createQueryBuilder('estoque')
      .where(`estoque.usuarioId = ${id}`)
      .getMany();

    if (retorno.length == 0) {
      throw new NotFoundException('Nenhum estoque foi encontrado.');
    }

    return retorno;
  }

  async insertEstoque(estoqueDTO: EstoqueDTO, usuario: Usuario) {
    const { nome, quantidade, valor } = estoqueDTO;

    let estoque = this.create({
      nome: nome,
      quantidade: quantidade,
      valor: valor,
      usuario: usuario,
    });

    const save = await this.save(estoque);
    const retorno = {
      nome: save.nome,
      quantidade: save.quantidade,
      valor: save.valor,
      idUsuario: save.usuario.id,
    };

    return retorno;
  }

  // FUNÇÃO DELAY PARA TESTAR CONCORRENCIA
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async updateEstoque(id: number, estoqueDTO: EstoqueDTO, usuario: Usuario) {
    const { nome, quantidade, valor } = estoqueDTO;
    const estoque = await this.getById(id);

    if (!estoque) {
      throw new NotFoundException('O estoque não foi encontrado.');
    }

    await this.delay(5000);

    estoque.nome = nome;
    estoque.quantidade = quantidade;
    estoque.valor = valor;
    estoque.usuario = usuario;
    estoque.emEdicao = false;

    const save = await this.save(estoque);
    const retorno = {
      nome: save.nome,
      quantidade: save.quantidade,
      valor: save.valor,
      idUsuario: save.usuario.id,
    };

    return retorno;
  }

  async deleteEstoque(id: number) {
    const estoque = await this.getById(id);
    if (!estoque) {
      throw new NotFoundException('O estoque não foi encontrado.');
    }
    return this.delete(id);
  }
}
