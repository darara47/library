import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerSource } from 'src/database/transactions/query-runner';
import { Book } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, QueryRunnerSource],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
