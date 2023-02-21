import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Paginators } from 'src/types/paginators';

class Filters {
  @ApiProperty({ example: 'Bambo' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'wiersz' })
  @IsString()
  @IsOptional()
  genre: string;
}

export class QueryFindBookDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Filters)
  readonly filters: Filters;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Paginators)
  readonly paginators: Paginators;
}
