import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CHARTS_PATTERN, NOT_WHITESPACES_PATTERN } from 'src/utiles/patterns';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly lastName: string;

  @ApiProperty({
    example: '1950-09-01',
  })
  @IsDateString()
  readonly birthDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsOptional()
  @IsDateString()
  readonly deathDate?: Date;
}
