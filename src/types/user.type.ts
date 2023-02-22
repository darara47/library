import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './userRoles.enum';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: UserRoles;
}
