import { PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsDate } from 'class-validator';

class FindUserDtoProperties {
  @IsString()
  readonly id: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly activationAccountToken: string;

  @IsString()
  readonly resetPasswordCode: string;

  @IsString()
  readonly resetPasswordToken: string;

  @IsDate()
  readonly resetPasswordTokenExpiresAt: Date;
}
export class FindUserDto extends PartialType(FindUserDtoProperties) {}
