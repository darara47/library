import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'A long, long time ago ..',
  })
  @IsString()
  @IsNotEmpty()
  readonly biography: string;

  @ApiProperty({
    example: '',
  })
  @IsDateString()
  readonly birthDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsOptional()
  @IsDateString()
  readonly deathDate: Date;

  @ApiProperty({
    example: '',
  })
  @IsString()
  readonly createdBy: string;
}
