import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/modules/users/users.service';
import { JwtValidateAuthDto } from '../dto/jwt-validate-auth.dto';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtValidateAuthDto) {
    try {
      await this.usersService.findOne({ id: payload.userId });
    } catch (error) {
      throw new UnauthorizedException(`Can't find user with given token.`);
    }
    return { email: payload.email, role: payload.role, userId: payload.userId };
  }
}
