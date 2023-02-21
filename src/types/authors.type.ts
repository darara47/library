import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  deathDate?: Date;
}
