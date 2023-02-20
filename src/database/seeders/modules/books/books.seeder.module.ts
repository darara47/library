import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/modules/books/book.entity';
import { BooksSeederService } from './books.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksSeederService],
  exports: [BooksSeederService],
})
export class BooksSeederModule {}
