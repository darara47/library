import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunnerSource } from 'src/database/transactions/query-runner';
import { BorrowedBookResponse } from 'src/types/borrowed-book.type';
import { IsNull, Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { BorrowedBook } from './borrowed-book.entity';
import { BorrowBookDto } from './dto/borrow-book.dto';

@Injectable()
export class BorrowedBooksService {
  constructor(
    @InjectRepository(BorrowedBook)
    private readonly borrowedBooksRepository: Repository<BorrowedBook>,
    private readonly queryRunnerSource: QueryRunnerSource,
    private readonly booksService: BooksService,
  ) {}

  async borrowBook(
    borrowBookDto: BorrowBookDto,
  ): Promise<BorrowedBookResponse> {
    const queryRunner = await this.queryRunnerSource.create();

    try {
      const { bookId, userId } = borrowBookDto;

      const isAvailable = await this.booksService.checkIfAvailable(bookId);

      if (!isAvailable) {
        throw new Error(`Book #${bookId} unavailable.`);
      }

      const borrowedBook = queryRunner.manager.create(BorrowedBook, {
        book: { id: bookId },
        user: { id: userId },
        borrowedDate: new Date(),
      });

      await queryRunner.manager.save(borrowedBook);

      await this.booksService.borrow(bookId, queryRunner);

      await queryRunner.commitTransaction();

      return this.mapBorrowedBook(borrowedBook);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async returnBook(id: string): Promise<BorrowedBookResponse> {
    const queryRunner = await this.queryRunnerSource.create();

    try {
      const borrowedBook = await queryRunner.manager.preload(BorrowedBook, {
        id,
      });

      if (!borrowedBook) {
        throw new NotFoundException(`BorrowedBook #${id} not found.`);
      }

      if (borrowedBook.returnDate) {
        throw new Error(`BorrowedBook #${id} already returned.`);
      }

      const updatedBorrowedBook = {
        ...borrowedBook,
        returnDate: new Date(),
      };

      await queryRunner.manager.save(updatedBorrowedBook);

      const { book } = await this.findOne(id);
      await this.booksService.return(book.id, queryRunner);

      await queryRunner.commitTransaction();

      return this.mapBorrowedBook(updatedBorrowedBook);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async find(userId: string): Promise<BorrowedBookResponse[]> {
    const borrowedBooks = await this.borrowedBooksRepository.find({
      where: {
        user: { id: userId },
        returnDate: IsNull(),
      },
      relations: ['book', 'book.author'],
    });
    return this.mapBorrowedBooks(borrowedBooks);
  }

  async findOne(id: string): Promise<BorrowedBookResponse> {
    const borrowedBook = await this.borrowedBooksRepository.findOne({
      where: {
        id,
      },
      relations: ['book'],
    });

    if (!borrowedBook) {
      throw new NotFoundException(`BorrowedBook #${id} not found`);
    }

    return this.mapBorrowedBook(borrowedBook);
  }

  async remove(id: string): Promise<void> {
    const borrowedBook = await this.findOne(id);

    await this.borrowedBooksRepository.softRemove(borrowedBook);
  }

  private mapBorrowedBook(borrowedBook: BorrowedBook): BorrowedBookResponse {
    return {
      id: borrowedBook.id,
      book: borrowedBook.book,
      borrowedDate: borrowedBook.borrowedDate,
      returnDate: borrowedBook.returnDate,
    };
  }

  private mapBorrowedBooks(
    borrowedBooks: BorrowedBook[],
  ): BorrowedBookResponse[] {
    return borrowedBooks.map((borrowedBook) =>
      this.mapBorrowedBook(borrowedBook),
    );
  }
}
