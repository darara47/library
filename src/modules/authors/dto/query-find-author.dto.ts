import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { SearchQueryAuthorsOrderBy } from 'src/types/author.type';
import { Paginators } from '../../../types/paginators';

export class QueryFindAuthorDto extends Paginators {
  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @Type(() => String)
  isAlive: boolean;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    default: SearchQueryAuthorsOrderBy.lastName,
    enum: SearchQueryAuthorsOrderBy,
    required: false,
  })
  @IsEnum(SearchQueryAuthorsOrderBy)
  @IsOptional()
  readonly orderBy: SearchQueryAuthorsOrderBy =
    SearchQueryAuthorsOrderBy.lastName;
}
