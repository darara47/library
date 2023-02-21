import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create new book.' })
  @ApiCreatedResponse({
    description: 'Successfully created.',
    type: BookResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponse> {
    return this.booksService.create(createBookDto);
  }

  @Post('search')
  @ApiOperation({ summary: 'Search books.' })
  @ApiOkResponse({
    description: 'Results returned.',
    type: Array<BookResponse>,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  search(@Body() queryFindBookDto: QueryFindBookDto): Promise<BookResponse[]> {
    return this.booksService.search(queryFindBookDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book.' })
  @ApiOkResponse({
    description: 'Successfully updated.',
    type: BookResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async update(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<BookResponse> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove book.' })
  @ApiOkResponse({
    description: 'Successfully removed.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
