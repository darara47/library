import { IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { UserRoles } from 'src/types/userTypes.enum';

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
