import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../modules/authors/author.entity';
import { PagesResponse } from './paginators';

export class BookResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: Author;

  @ApiProperty()
  publicationDate: Date;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  totalCopies: number;

  @ApiProperty()
  availableCopies: number;
}

export enum SearchQueryBooksOrderBy {
  genre = 'genre',
  publicationDate = 'publicationDate',
  title = 'title',
}

export class SearchQueryBooksResponse {
  @ApiProperty({
    isArray: true,
    type: BookResponse,
  })
  data: BookResponse[];

  @ApiProperty({
    type: PagesResponse,
  })
  pages: PagesResponse;
}
