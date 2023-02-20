import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordCodeAuthDto {
  @ApiProperty({
    example: 'johny.reader@test.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
