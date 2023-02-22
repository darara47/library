import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({
    example: '00000000-0000-0000-0002-000000000001',
  })
  @IsString()
  @IsNotEmpty()
  readonly bookId: string;

  @ApiProperty({
    example: '00000000-0000-0000-0001-000000000001',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
