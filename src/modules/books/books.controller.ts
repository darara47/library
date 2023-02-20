import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookResponse } from 'src/types/books.type';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryFindBookDto } from './dto/query-find-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponse> {
    return this.booksService.create(createBookDto);
  }

  @Post('search')
  search(@Body() queryFindBookDto: QueryFindBookDto) {
    return this.booksService.search(queryFindBookDto);
  }

  @Patch(':id')
  async update(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<BookResponse> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
