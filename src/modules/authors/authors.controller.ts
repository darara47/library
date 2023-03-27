import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorResponse } from '../../types/author.type';
import { LoggedUser } from '../../types/loggedUser.type';
import { UserRoles } from '../../types/userRoles.enum';
import { CurrentUser, Public, Role } from '../../utiles/custom-decorators';
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
  @ApiOperation({ summary: 'Create new author.' })
  @ApiCreatedResponse({
    description: 'Successfully created.',
    type: AuthorResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @CurrentUser() loggedUser: LoggedUser,
  ): Promise<AuthorResponse> {
    return this.authorsService.create(createAuthorDto, loggedUser.id);
  }

  @Post('search')
  @ApiOperation({ summary: 'Search authors.' })
  @ApiOkResponse({
    description: 'Results returned.',
    type: Array<AuthorResponse>,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Public()
  search(
    @Body() queryFindAuthorDto: QueryFindAuthorDto,
  ): Promise<AuthorResponse[]> {
    return this.authorsService.search(queryFindAuthorDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author.' })
  @ApiOkResponse({
    description: 'Successfully updated.',
    type: AuthorResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async update(
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<AuthorResponse> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove author.' })
  @ApiOkResponse({
    description: 'Successfully removed.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  @Role(UserRoles.admin)
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(id);
  }
}
