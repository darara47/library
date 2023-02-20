import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorResponse } from 'src/types/authors.type';
import { LoggedUser } from 'src/types/loggedUser.type';
import { UserRoles } from 'src/types/userRoles.enum';
import { CurrentUser, Roles } from 'src/utiles/custom-decorators';
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
  @Roles(UserRoles.admin)
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @CurrentUser() loggedUser: LoggedUser,
  ): Promise<AuthorResponse> {
    return this.authorsService.create(createAuthorDto, loggedUser.id);
  }

  @Post('search')
  search(@Body() queryFindAuthorDto: QueryFindAuthorDto) {
    return this.authorsService.search(queryFindAuthorDto);
  }

  @Patch(':id')
  @Roles(UserRoles.admin)
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
