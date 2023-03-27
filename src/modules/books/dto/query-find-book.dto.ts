import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SearchQueryBooksOrderBy } from 'src/types/book.type';
import { Paginators } from '../../../types/paginators';

export class QueryFindBookDto extends Paginators {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty({
    default: SearchQueryBooksOrderBy.title,
    enum: SearchQueryBooksOrderBy,
    required: false,
  })
  @IsEnum(SearchQueryBooksOrderBy)
  @IsOptional()
  readonly orderBy: SearchQueryBooksOrderBy = SearchQueryBooksOrderBy.title;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;
}
