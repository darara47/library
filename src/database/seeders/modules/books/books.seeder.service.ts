import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { booksMock } from 'src/mocks/books.mock';
import { Repository } from 'typeorm';
import { Book } from '../../../../modules/books/book.entity';

@Injectable()
export class BooksSeederService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async create() {
    const addedBooks = booksMock.map(async (book) => {
      const isAdded = await this.repository.findOneBy({
        id: book.id,
      });

      if (isAdded) {
        return Promise.resolve();
      }

      return await this.repository.save(this.repository.create(book));
    });

    return Promise.all(addedBooks);
  }
}
