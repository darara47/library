import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class ResetPasswordAuthDto {
  @ApiProperty({
    example: 'johny.reader@test.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;
}
