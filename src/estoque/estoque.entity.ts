import { Usuario } from 'src/auth/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  quantidade: number;
  @Column()
  valor: number;
  @Column({ default: false })
  emEdicao: boolean;
  @ManyToOne((type) => Usuario, (usuario) => usuario.estoques, { eager: false })
  usuario: Usuario;
}
