import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookResponse } from 'src/types/books.type';
import { UserRoles } from 'src/types/userRoles.enum';
import { Role } from 'src/utiles/custom-decorators';
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
  @Role(UserRoles.admin)
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponse> {
    return this.booksService.create(createBookDto);
  }

  @Post('search')
  search(@Body() queryFindBookDto: QueryFindBookDto) {
    return this.booksService.search(queryFindBookDto);
  }

  @Patch(':id')
  @Role(UserRoles.admin)
  async update(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<BookResponse> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @Role(UserRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
