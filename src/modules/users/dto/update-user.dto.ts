import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import {
  CHARTS_PATTERN,
  NOT_WHITESPACES_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from '../../../utiles/patterns';

class UpdateUserDtoProps {
  @ApiProperty({
    example: 'Jane',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly lastName: string;

  @ApiProperty({
    example: 'jane.doe@test.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_PATTERN)
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN)
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
