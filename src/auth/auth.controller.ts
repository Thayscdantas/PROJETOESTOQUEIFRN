import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredenciaisDTO } from './dtos/credenciais.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() credenciaisDTO: CredenciaisDTO) {
    return this.authService.signUp(credenciaisDTO);
  }

  @Post('/signin')
  async signIn(
    @Body() credenciaisDTO: CredenciaisDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credenciaisDTO);
  }
}
