import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateTokenByString } from '../../utiles/generateTokenByString';
import { Raw } from 'typeorm';
import * as dayjs from 'dayjs';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResetPasswordAuthDto } from './dto/reset-password-auth.dto';
import { ResetPasswordCodeAuthDto } from './dto/reset-password-code-auth.dto';
import { SetPasswordAuthDto } from './dto/set-password-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<void> {
    const { email } = registerAuthDto;

    const activationAccountToken = generateTokenByString(email);
    const nextWeek = dayjs().add(1, 'week') as unknown as Date;

    await this.usersService.create({
      ...registerAuthDto,
      activationAccountToken,
      activationAccountTokenExpiresAt: nextWeek,
    });
  }

  async activate(activationAccountToken: string): Promise<{ name: string }> {
    const user = await this.usersService.findOne({
      activationAccountToken,
      activationAccountTokenExpiresAt: Raw(
        (alias) => `${alias} > NOW()`,
      ) as any,
    });

    await this.usersService.update(user.id, { activationAccountToken: null });

    return { name: user.fullName };
  }

  async login(email: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne({ email });
    const payload = {
      email: user.email,
      role: user.role,
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async resetPassword(
    resetPasswordAuthDto: ResetPasswordAuthDto,
  ): Promise<void> {
    const { email } = resetPasswordAuthDto;
    const user = await this.usersService.findOne({ email });

    const randomValue = Math.floor(Math.random() * 1000000);
    const resetPasswordCode = `000000${randomValue}`.slice(-6);
    const resetPasswordToken = generateTokenByString(
      `${email}${resetPasswordCode}`,
    );
    const nextDay = dayjs().add(1, 'day') as unknown as Date;

    await this.usersService.update(user.id, {
      resetPasswordCode,
      resetPasswordToken,
      resetPasswordTokenExpiresAt: nextDay,
    });
  }

  async codeValidation(
    resetPasswordCodeAuthDto: ResetPasswordCodeAuthDto,
  ): Promise<{ resetPasswordToken: string }> {
    const resetPasswordToken = await this.usersService.getResetPasswordToken(
      resetPasswordCodeAuthDto,
    );

    if (!resetPasswordToken) {
      throw new UnauthorizedException(`Can't find user with given data.`);
    }

    return { resetPasswordToken };
  }

  async setPassword(setPasswordAuthDto: SetPasswordAuthDto): Promise<void> {
    const { password, resetPasswordToken } = setPasswordAuthDto;
    const user = await this.usersService.findOne({
      resetPasswordToken,
      resetPasswordTokenExpiresAt: Raw((alias) => `${alias} > NOW()`) as any,
    });

    if (!user) {
      throw new UnauthorizedException(`Can't find user with given data.`);
    }

    await this.usersService.update(user.id, {
      password,
      resetPasswordToken: null,
    });
  }
}
