import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utiles/custom-decorators';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/reset-password-auth.dto';
import { ResetPasswordCodeAuthDto } from './dto/reset-password-code-auth.dto';
import { SetPasswordAuthDto } from './dto/set-password-auth.dto';
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

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
    return this.authService.resetPassword(resetPasswordAuthDto);
  }

  @Public()
  @Post('reset-password-code')
  async codeValidation(
    @Body() resetPasswordCodeAuthDto: ResetPasswordCodeAuthDto,
  ) {
    return this.authService.codeValidation(resetPasswordCodeAuthDto);
  }

  @Public()
  @Post('set-password')
  async setPassword(
    @Body()
    setPasswordAuthDto: SetPasswordAuthDto,
  ) {
    return this.authService.setPassword(setPasswordAuthDto);
  }
}
