import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/modules/authors/author.entity';

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
