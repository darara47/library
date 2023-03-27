import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { UserRoles } from '../../../types/userRoles.enum';
import {
  CHARTS_PATTERN,
  NOT_WHITESPACES_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from '../../../utiles/patterns';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(CHARTS_PATTERN)
  @Matches(NOT_WHITESPACES_PATTERN)
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_PATTERN)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly activationAccountToken: string;

  @IsDate()
  readonly activationAccountTokenExpiresAt: Date;

  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
