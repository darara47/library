import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/modules/books/book.entity';

export class BorrowedBookResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  book: Book;

  @ApiProperty()
  borrowedDate: Date;

  @ApiProperty()
  returnDate: Date;
}
