import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SetPasswordAuthDto {
  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @Length(8)
  readonly password: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  readonly resetPasswordToken: string;
}
