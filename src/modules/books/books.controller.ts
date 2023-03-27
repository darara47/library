import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookResponse, SearchQueryBooksResponse } from '../../types/book.type';
import { UserRoles } from '../../types/userRoles.enum';
import { Public, Role } from '../../utiles/custom-decorators';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryFindBookDto } from './dto/query-find-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @ApiBearerAuth()
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

  @Get('search')
  @ApiOperation({ summary: 'Search books.' })
  @ApiOkResponse({
    description: 'Results returned.',
    type: SearchQueryBooksResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Public()
  search(
    @Query() queryFindBookDto: QueryFindBookDto,
  ): Promise<SearchQueryBooksResponse> {
    return this.booksService.search(queryFindBookDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
