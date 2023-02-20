import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

class UpdateAuthorDtoProps {
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
