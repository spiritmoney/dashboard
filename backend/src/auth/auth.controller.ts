import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { address: string }) {
    const user = await this.authService.validateUser(loginDto.address);
    if (!user) {
      await this.authService.signup(loginDto.address);
    }
    return this.authService.login(loginDto.address);
  }
}
