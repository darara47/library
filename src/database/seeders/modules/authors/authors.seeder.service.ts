import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authorsMock } from '../../../../mocks/authors.mock';
import { Repository } from 'typeorm';
import { Author } from '../../../../modules/authors/author.entity';
import { QueryRunnerSource } from '../../../query-runner';

@Injectable()
export class AuthorsSeederService {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
    private readonly queryRunnerSource: QueryRunnerSource,
  ) {}

  async create() {
    const queryRunner = await this.queryRunnerSource.createTransaction();

    try {
      for await (const author of authorsMock) {
        const isAdded = await queryRunner.manager.findOneBy(Author, {
          id: author.id,
        });

        if (!isAdded) {
          await queryRunner.manager.save(
            queryRunner.manager.create(Author, author),
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
