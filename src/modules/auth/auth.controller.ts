import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../utiles/custom-decorators';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/reset-password-auth.dto';
import { ResetPasswordCodeAuthDto } from './dto/reset-password-code-auth.dto';
import { SetPasswordAuthDto } from './dto/set-password-auth.dto';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({
    description: 'Successfully created.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async register(@Body() registerAuthDto: RegisterAuthDto): Promise<void> {
    return this.authService.register(registerAuthDto);
  }

  @Post('activate/:activationToken')
  @ApiOperation({ summary: 'Activate user account.' })
  @ApiCreatedResponse({
    description: 'Successfully activated.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async activate(
    @Param('activationToken') activationToken: string,
  ): Promise<{ name: string }> {
    return this.authService.activate(activationToken);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login.' })
  @ApiCreatedResponse({
    description: 'Successfully logged.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<{ accessToken: string }> {
    const { email } = loginAuthDto;
    return this.authService.login(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password.' })
  @ApiCreatedResponse({
    description: 'Successfully password reset.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async resetPassword(
    @Body() resetPasswordAuthDto: ResetPasswordAuthDto,
  ): Promise<void> {
    return this.authService.resetPassword(resetPasswordAuthDto);
  }

  @Post('reset-password-code')
  @ApiOperation({ summary: 'Verify code to password reset.' })
  @ApiCreatedResponse({
    description: 'Successfully validated.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async codeValidation(
    @Body() resetPasswordCodeAuthDto: ResetPasswordCodeAuthDto,
  ): Promise<{ resetPasswordToken: string }> {
    return this.authService.codeValidation(resetPasswordCodeAuthDto);
  }

  @Post('set-password')
  @ApiOperation({ summary: 'Set new password.' })
  @ApiCreatedResponse({
    description: 'Successfully set password.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async setPassword(
    @Body()
    setPasswordAuthDto: SetPasswordAuthDto,
  ): Promise<void> {
    return this.authService.setPassword(setPasswordAuthDto);
  }
}
