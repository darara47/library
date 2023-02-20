import { IsString, IsEmail } from 'class-validator';

export class LocalValidateAuthDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
