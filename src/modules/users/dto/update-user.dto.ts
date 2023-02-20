import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

class UpdateUserDtoProps {
  @ApiProperty({
    example: 'Jane',
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
    example: 'jane.doe@test.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly activationAccountToken: string;

  @IsDate()
  readonly activationAccountTokenExpiresAt: Date;

  @IsString()
  readonly resetPasswordCode: string;

  @IsString()
  readonly resetPasswordToken: string;

  @IsDate()
  readonly resetPasswordTokenExpiresAt: Date;
}

export class UpdateUserDto extends PartialType(UpdateUserDtoProps) {}
