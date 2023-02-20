import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(email: string) {
    const user = await this.usersService.findOne(null, email);
    const payload = {
      email: user.email,
      role: user.role,
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
