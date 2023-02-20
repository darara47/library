import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class UpdateBookDtoProps {
  @ApiProperty({
    example: 'Góry Parnasu',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '00000000-0000-0000-0002-000000000004',
  })
  @IsString()
  @IsNotEmpty()
  readonly authorId: string;

  @ApiProperty({
    example: '2012',
  })
  @IsDateString()
  readonly publicationDate: Date;

  @ApiProperty({
    example: 'science-fiction',
  })
  @IsString()
  readonly genre: string;

  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  readonly totalCopies: number;

  @ApiProperty({
    example: 18,
  })
  @IsNumber()
  readonly availableCopies: number;
}

export class UpdateBookDto extends PartialType(UpdateBookDtoProps) {}
