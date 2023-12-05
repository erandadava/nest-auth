import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto){
    try {
      const result = await this.authService.login(authLoginDto);
      return result;
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test(){
    return 'Success!';
  }
}
