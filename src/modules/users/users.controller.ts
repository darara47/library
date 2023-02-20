import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  async getMyself(
    @CurrentUser() loggedUser: LoggedUser,
  ): Promise<UserResponse> {
    return this.usersService.findOne({ id: loggedUser.id });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
