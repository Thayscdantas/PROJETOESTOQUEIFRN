import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from 'src/auth/get-usuario.decorator';
import { Usuario } from 'src/auth/usuario.entity';
import { EstoqueDTO } from './dtos/estoque.dto';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
@UseGuards(AuthGuard('jwt'))
export class EstoqueController {
  constructor(private estoqueService: EstoqueService) {}

  @Get()
  listar() {
    return this.estoqueService.getAllEstoques();
  }

  @Get('/detalhar/:id')
  detalhar(@Param('id') id: number) {
    return this.estoqueService.getEstoqueById(id);
  }

  @Get('/meus-estoques')
  listarMeusEstoques(@GetUsuario() usuario: Usuario) {
    return this.estoqueService.getEstoqueByIdUsuario(usuario.id);
  }

  @Post()
  inserir(@Body() EstoqueDTO: EstoqueDTO, @GetUsuario() usuario: Usuario) {
    return this.estoqueService.insertEstoque(EstoqueDTO, usuario);
  }

  @Put('/:id')
  async atualizar(
    @Param('id') id: number,
    @Body() EstoqueDTO: EstoqueDTO,
    @GetUsuario() usuario: Usuario,
  ) {
    await this.estoqueService.setEdicao(id);
    return this.estoqueService.updateEstoque(id, EstoqueDTO, usuario);
  }

  @Delete('/:id')
  deletar(@Param('id') id: number) {
    return this.estoqueService.deleteEstoque(id);
  }
}
