import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { usersMock } from '../../../../mocks/users.mock';
import { Repository } from 'typeorm';
import { User } from '../../../../modules/users/user.entity';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create() {
    const addedUsers = usersMock.map(async (user) => {
      const isAdded = await this.repository.findOneBy({
        id: user.id,
      });

      if (isAdded) {
        return Promise.resolve();
      }

      return await this.repository.save(this.repository.create(user));
    });

    return Promise.all(addedUsers);
  }
}
