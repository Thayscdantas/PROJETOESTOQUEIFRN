import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EstoqueController } from './estoque.controller';
import { EstoqueRepository } from './estoque.repository';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueRepository]), AuthModule],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
