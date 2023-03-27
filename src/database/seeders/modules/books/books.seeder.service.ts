import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { booksMock } from '../../../../mocks/books.mock';
import { Repository } from 'typeorm';
import { Book } from '../../../../modules/books/book.entity';
import { QueryRunnerSource } from '../../../query-runner';

@Injectable()
export class BooksSeederService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
    private readonly queryRunnerSource: QueryRunnerSource,
  ) {}

  async create() {
    const queryRunner = await this.queryRunnerSource.createTransaction();

    try {
      for await (const book of booksMock) {
        const isAdded = await queryRunner.manager.findOneBy(Book, {
          id: book.id,
        });

        if (!isAdded) {
          await queryRunner.manager.save(
            queryRunner.manager.create(Book, book),
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
