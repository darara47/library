import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  CHARTS_PATTERN,
  NOT_WHITESPACES_PATTERN,
} from '../../../utiles/patterns';

class UpdateAuthorDtoProps {
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
    example: '',
  })
  @IsDateString()
  readonly birthDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsDateString()
  readonly deathDate: Date;
}

export class UpdateAuthorDto extends PartialType(UpdateAuthorDtoProps) {}
