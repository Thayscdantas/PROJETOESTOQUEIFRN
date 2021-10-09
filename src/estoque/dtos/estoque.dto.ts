import { IsNotEmpty, IsPositive } from 'class-validator';

export class EstoqueDTO {
  id?: number;
  @IsNotEmpty()
  nome: string;
  @IsPositive()
  quantidade: number;
  @IsNotEmpty()
  valor: number;
}
