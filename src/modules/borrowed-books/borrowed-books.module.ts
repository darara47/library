import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedBooksService } from './borrowed-books.service';
import { BorrowedBooksController } from './borrowed-books.controller';
import { BorrowedBook } from './borrowed-book.entity';
import { BooksModule } from '../books/books.module';
import { QueryRunnerSource } from 'src/database/transactions/query-runner';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedBook]), BooksModule],
  providers: [BorrowedBooksService, QueryRunnerSource],
  controllers: [BorrowedBooksController],
  exports: [BorrowedBooksService],
})
export class BorrowedBooksModule {}
