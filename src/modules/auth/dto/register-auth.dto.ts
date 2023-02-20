import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRoles } from 'src/types/userRoles.enum';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'Noah',
  })
  @Length(2, 50)
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Van Doe',
  })
  @IsString()
  @Length(2, 50)
  readonly lastName: string;

  @ApiProperty({
    example: 'test@test.pl',
  })
  @IsEmail()
  @Length(0, 250)
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @Length(8)
  readonly password: string;

  @ApiProperty({
    example: UserRoles.reader,
  })
  @IsEnum(UserRoles)
  readonly role: UserRoles;
}
