import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserResponse } from './users.type';
import { UserTypes } from 'src/types/userTypes';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    if (createUserDto.type !== UserTypes.reader) {
      const createdByUser = await this.findOne(createUserDto?.createdBy);

      if (createdByUser.type !== UserTypes.admin) {
        throw new Error(
          `You don't have permission to create this type of user.`,
        );
      }
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

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneBy({ id });

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

  private mapUser(user: User): UserResponse {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      type: user.type,
    };
  }
}
