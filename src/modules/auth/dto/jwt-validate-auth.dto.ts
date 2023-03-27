import { IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { UserRoles } from '../../../types/userRoles.enum';

export class JwtValidateAuthDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsEnum(UserRoles)
  readonly role: UserRoles;

  @IsString()
  readonly userId: string;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;
}
