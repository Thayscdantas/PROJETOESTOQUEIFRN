import { Estoque } from 'src/estoque/estoque.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  login: string;
  @Column()
  senha: string;

  @OneToMany((type) => Estoque, (estoque) => estoque.usuario, { eager: true })
  estoques: Estoque[];
}
