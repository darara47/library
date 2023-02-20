import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from 'src/types/userRoles.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jane',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'jane.doe@test.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Password!123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: UserRoles.reader,
  })
  @IsEnum(UserRoles)
  readonly role: UserRoles;

  @ApiProperty({
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly createdBy?: string;
}
