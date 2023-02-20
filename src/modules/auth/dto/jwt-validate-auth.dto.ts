import { IsString, IsEmail, IsObject, IsNumber } from 'class-validator';

class SubType {
  @IsString()
  readonly userId: string;
}

export class JwtValidateAuthDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsObject()
  readonly sub: SubType;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;
}
