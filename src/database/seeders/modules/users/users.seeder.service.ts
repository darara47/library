import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { usersMock } from '../../../../mocks/users.mock';
import { Repository } from 'typeorm';
import { User } from '../../../../modules/users/user.entity';
import { QueryRunnerSource } from '../../../query-runner';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly queryRunnerSource: QueryRunnerSource,
  ) {}

  async create() {
    const queryRunner = await this.queryRunnerSource.createTransaction();

    try {
      for await (const user of usersMock) {
        const isAdded = await queryRunner.manager.findOneBy(User, {
          id: user.id,
        });

        if (!isAdded) {
          await queryRunner.manager.save(
            queryRunner.manager.create(User, user),
          );
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
