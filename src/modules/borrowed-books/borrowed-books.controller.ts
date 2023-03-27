import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowedBookResponse } from '../../types/borrowed-book.type';
import { UserRoles } from '../../types/userRoles.enum';
import { Role } from '../../utiles/custom-decorators';
import { BorrowedBooksService } from './borrowed-books.service';
import { BorrowBookDto } from './dto/borrow-book.dto';

@ApiBearerAuth()
@ApiTags('Borrowed-books')
@Controller('borrowed-books')
export class BorrowedBooksController {
  constructor(private borrowedbooksService: BorrowedBooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new borrwed book.' })
  @ApiCreatedResponse({
    description: 'Successfully created.',
    type: BorrowedBookResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async borrowBook(
    @Body() borrowBookDto: BorrowBookDto,
  ): Promise<BorrowedBookResponse> {
    return this.borrowedbooksService.borrowBook(borrowBookDto);
  }

  @Patch('return/:id')
  @ApiOperation({ summary: 'Return borrowed book.' })
  @ApiOkResponse({
    description: 'Successfully updated.',
    type: BorrowedBookResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async returnBook(@Param('id') id: string): Promise<BorrowedBookResponse> {
    return this.borrowedbooksService.returnBook(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove borrowedbook.' })
  @ApiOkResponse({
    description: 'Successfully removed.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.borrowedbooksService.remove(id);
  }
}
