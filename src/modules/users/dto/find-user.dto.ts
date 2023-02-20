import { PartialType } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

class FindUserDtoProperties {
  @IsString()
  readonly id: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly activationAccountToken: string;
}
export class FindUserDto extends PartialType(FindUserDtoProperties) {}
