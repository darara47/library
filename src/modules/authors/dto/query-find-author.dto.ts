import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Paginators } from 'src/types/paginators';

class Filters {
  @ApiProperty({
    example: 'wi',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isAlive: boolean;
}

export class QueryFindAuthorDto {
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
