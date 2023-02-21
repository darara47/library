import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserResponse } from '../../types/users.type';
import { CurrentUser } from 'src/utiles/custom-decorators';
import { LoggedUser } from 'src/types/loggedUser.type';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Update logged user.' })
  @ApiOkResponse({
    description: 'Results returned.',
    type: UserResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async getLogged(
    @CurrentUser() loggedUser: LoggedUser,
  ): Promise<UserResponse> {
    return this.usersService.findOne({ id: loggedUser.id });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({
    description: 'Results returned.',
    type: UserResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async get(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user.' })
  @ApiOkResponse({
    description: 'Successfully updated.',
    type: UserResponse,
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove user.' })
  @ApiOkResponse({
    description: 'Successfully removed.',
  })
  @ApiResponse({
    status: '4XX',
    description: 'The error happened.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
