import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerSource } from '../../../query-runner';
import { Book } from '../../../../modules/books/book.entity';
import { BooksSeederService } from './books.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksSeederService, QueryRunnerSource],
  exports: [BooksSeederService],
})
export class BooksSeederModule {}
