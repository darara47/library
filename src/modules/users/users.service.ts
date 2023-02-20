import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserResponse } from '../../types/users.type';
import { UserRoles } from 'src/types/userRoles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    if (createUserDto.role !== UserRoles.reader) {
      await this.checkIsAdmin(createUserDto.createdBy);
    }

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
    const cryptPassword =
      updateUserDto.password &&
      (await this.cryptPassword(updateUserDto.password));

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

  async findOne(id?: string, email?: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneBy({ id, email });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.mapUser(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.usersRepository.softRemove(user);
  }

  private async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);
    return cryptPassword;
  }

  async authValidate(email: string, password: string): Promise<void> {
    const throwUnauthorizedException = () => {
      throw new UnauthorizedException(`Can't find user with given data.`);
    };

    const user = await this.usersRepository.findOne({
      where: { email },
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

  async checkIsAdmin(id: string): Promise<void> {
    const user = await this.findOne(id);

    if (user?.role !== UserRoles.admin) {
      throw new Error("You don't permitted");
    }
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
