import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from 'src/types/userRoles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly activationAccountToken: string;

  @IsDate()
  readonly activationAccountTokenExpiresAt: Date;

  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
