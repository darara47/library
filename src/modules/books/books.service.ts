import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunnerSource } from '../../database/query-runner';
import { BookResponse } from '../../types/book.type';
import { QueryRunner, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryFindBookDto } from './dto/query-find-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly queryRunnerSource: QueryRunnerSource,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookResponse> {
    const { authorId } = createBookDto;
    const book = this.booksRepository.create({
      ...createBookDto,
      author: { id: authorId },
    });
    await this.booksRepository.save(book);

    return this.mapBook(book);
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    continueQueryRunner?: QueryRunner,
  ): Promise<BookResponse> {
    const queryRunner =
      continueQueryRunner || (await this.queryRunnerSource.createTransaction());

    try {
      const book = await queryRunner.manager.preload(Book, {
        ...updateBookDto,
        id,
      });

      if (!book) {
        throw new NotFoundException(`Book #${id} not found`);
      }

      await queryRunner.manager.save(book);

      continueQueryRunner || (await queryRunner.commitTransaction());
      return this.mapBook(book);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      continueQueryRunner || (await queryRunner.release());
    }
  }

  async search(queryFindBookDto: QueryFindBookDto) {
    const { filters, paginators } = queryFindBookDto;

    const results = await this.booksRepository
      .createQueryBuilder('books')
      .where(`LOWER(books.title) LIKE LOWER(:title)`, {
        title: `%${filters.title}%`,
      })
      .andWhere(`LOWER(books.genre) LIKE LOWER(:genre)`, {
        genre: `%${filters.genre}%`,
      })
      .orderBy(`books.${paginators.order.byColumn}`, paginators.order.direction)
      .offset(paginators.page.size * (paginators.page.index - 1))
      .limit(paginators.page.size)
      .getMany();

    return this.mapBooks(results);
  }

  async findOne(id: string): Promise<BookResponse> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return this.mapBook(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);

    await this.booksRepository.softRemove(book);
  }

  async checkIfAvailable(id: string): Promise<boolean> {
    const book = await this.findOne(id);
    const isAvailable = book.availableCopies > 0;
    return isAvailable;
  }

  async borrow(id: string, continueQueryRunner: QueryRunner): Promise<void> {
    const book = await this.findOne(id);
    const newAvailableCopies = book.availableCopies - 1;

    await this.update(
      id,
      { availableCopies: newAvailableCopies },
      continueQueryRunner,
    );
  }

  async return(id: string, continueQueryRunner: QueryRunner): Promise<void> {
    const book = await this.findOne(id);
    const newAvailableCopies = book.availableCopies + 1;

    await this.update(
      id,
      { availableCopies: newAvailableCopies },
      continueQueryRunner,
    );
  }

  private mapBook(book: Book): BookResponse {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publicationDate: book.publicationDate,
      genre: book.genre,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
    };
  }

  private mapBooks(books: Book[]): BookResponse[] {
    return books.map((book) => this.mapBook(book));
  }
}
