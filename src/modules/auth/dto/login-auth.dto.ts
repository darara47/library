import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'johny.admin@test.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  readonly password: string;
}
