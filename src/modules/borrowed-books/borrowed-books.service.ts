import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly booksService: BooksService,
  ) {}

  async borrowBook(
    borrowBookDto: BorrowBookDto,
  ): Promise<BorrowedBookResponse> {
    const { bookId, userId } = borrowBookDto;

    const isAvailable = await this.booksService.checkIfAvailable(bookId);

    if (!isAvailable) {
      throw new Error(`Book #${bookId} unavailable.`);
    }

    const borrowedBook = this.borrowedBooksRepository.create({
      book: { id: bookId },
      user: { id: userId },
      borrowedDate: new Date(),
    });

    await this.borrowedBooksRepository.save(borrowedBook);

    await this.booksService.borrow(bookId);

    return this.mapBorrowedBook(borrowedBook);
  }

  async returnBook(id: string): Promise<BorrowedBookResponse> {
    const borrowedBook = await this.borrowedBooksRepository.preload({
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

    await this.borrowedBooksRepository.save(updatedBorrowedBook);

    const { book } = await this.findOne(id);
    await this.booksService.return(book.id);

    return this.mapBorrowedBook(updatedBorrowedBook);
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
