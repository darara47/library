import { ApiProperty } from '@nestjs/swagger';
import { PagesResponse } from './paginators';

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

export enum SearchQueryAuthorsOrderBy {
  birthDate = 'birthDate',
  firstName = 'firstName',
  lastName = 'lastName',
}

export class SearchQueryAuthorsResponse {
  @ApiProperty({
    isArray: true,
    type: AuthorResponse,
  })
  data: AuthorResponse[];

  @ApiProperty({ type: PagesResponse })
  pages: PagesResponse;
}
