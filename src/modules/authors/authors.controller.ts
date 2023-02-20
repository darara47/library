import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorResponse } from 'src/types/authors.type';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryFindAuthorDto } from './dto/query-find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiBearerAuth()
@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorResponse> {
    return this.authorsService.create(createAuthorDto);
  }

  @Post('search')
  search(@Body() queryFindAuthorDto: QueryFindAuthorDto) {
    return this.authorsService.search(queryFindAuthorDto);
  }

  @Patch(':id')
  async update(
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<AuthorResponse> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(id);
  }
}
