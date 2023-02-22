import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserResponse } from '../../types/user.type';
import { FindUserDto } from './dto/find-user.dto';
import { ResetPasswordCodeAuthDto } from '../auth/dto/reset-password-code-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const cryptPassword = await this.cryptPassword(createUserDto.password);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: cryptPassword,
    });

    await this.usersRepository.save(user);

    return this.mapUser(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const { password } = updateUserDto;
    const cryptPassword = password && (await this.cryptPassword(password));

    const user = await this.usersRepository.preload({
      ...updateUserDto,
      password: cryptPassword,
      id,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    await this.usersRepository.save(user);

    return this.mapUser(user);
  }

  async findOne(findUserDto: FindUserDto): Promise<UserResponse> {
    const user = await this.usersRepository.findOneBy(findUserDto);

    if (!user) {
      throw new NotFoundException(
        `User with properties ${JSON.stringify(findUserDto)} not found`,
      );
    }

    return this.mapUser(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne({ id });

    await this.usersRepository.softRemove(user);
  }

  private async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);
    return cryptPassword;
  }

  async loginValidation(email: string, password: string): Promise<void> {
    const throwUnauthorizedException = () => {
      throw new UnauthorizedException(
        `Can't find user with given credentials.`,
      );
    };

    const user = await this.usersRepository.findOne({
      where: { email, activationAccountToken: IsNull() },
      select: { password: true },
    });

    if (!user) {
      throwUnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
      throwUnauthorizedException();
    }
  }

  async getResetPasswordToken(
    resetPasswordCodeAuthDto: ResetPasswordCodeAuthDto,
  ) {
    const { email, code } = resetPasswordCodeAuthDto;

    const user = await this.usersRepository.findOne({
      where: { email, resetPasswordCode: code },
      select: { resetPasswordToken: true },
    });

    if (!user) {
      throw new UnauthorizedException(
        `Can't find user with given credentials.`,
      );
    }

    const { resetPasswordToken } = user;

    return resetPasswordToken;
  }

  private mapUser(user: User): UserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    };
  }
}
