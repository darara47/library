import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utiles/custom-decorators';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Public()
  @Post('activate/:activationToken')
  async activate(@Param('activationToken') activationToken: string) {
    return this.authService.activate(activationToken);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const { email } = loginAuthDto;
    return this.authService.login(email);
  }
}
