import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateTokenByString } from 'src/utiles/generateTokenByString';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { email } = registerAuthDto;

    const activationAccountToken = generateTokenByString(email);

    await this.usersService.create({
      ...registerAuthDto,
      activationAccountToken,
    });
  }

  async activate(activationAccountToken: string): Promise<{ name: string }> {
    const user = await this.usersService.findOne({
      activationAccountToken,
    });

    await this.usersService.update(user.id, { activationAccountToken: null });

    return { name: user.fullName };
  }

  async login(email: string) {
    const user = await this.usersService.findOne({ email });
    const payload = {
      email: user.email,
      role: user.role,
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
