import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utiles/custom-decorators';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const { email } = loginAuthDto;
    return this.authService.login(email);
  }

  @Get('profile2')
  getProfile2() {
    console.log('WORKS');
  }
}
