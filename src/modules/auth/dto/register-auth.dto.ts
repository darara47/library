import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';
import { UserRoles } from 'src/types/userRoles.enum';
import {
  CHARTS_PATTERN,
  NOT_WHITESPACES_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from 'src/utiles/patterns';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'Noah',
  })
  @Length(2, 50)
  @IsString()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly firstName: string;

  @ApiProperty({
    example: 'Van Doe',
  })
  @IsString()
  @Length(2, 50)
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly lastName: string;

  @ApiProperty({
    example: 'test@test.pl',
  })
  @IsEmail()
  @Length(0, 250)
  @Matches(EMAIL_PATTERN)
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @Length(8)
  @Matches(PASSWORD_PATTERN)
  readonly password: string;

  @ApiProperty({
    example: UserRoles.reader,
  })
  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
