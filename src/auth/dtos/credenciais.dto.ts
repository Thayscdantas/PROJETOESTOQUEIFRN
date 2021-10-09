import { IsString, Matches, MinLength } from 'class-validator';

export class CredenciaisDTO {
  @IsString()
  @MinLength(3)
  login: string;

  @MinLength(8)
  senha: string;
}
