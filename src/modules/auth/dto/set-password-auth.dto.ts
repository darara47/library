import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { PASSWORD_PATTERN } from '../../../utiles/patterns';

export class SetPasswordAuthDto {
  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @Length(8)
  @Matches(PASSWORD_PATTERN)
  readonly password: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  readonly resetPasswordToken: string;
}
