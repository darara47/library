import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UserTypes } from 'src/types/userTypes';

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
    example: UserTypes.reader,
  })
  @IsEnum(UserTypes)
  readonly type: UserTypes;

  @ApiProperty({
    example: '',
  })
  @ValidateIf((createUserDto) => createUserDto.createdBy)
  @IsString()
  readonly createdBy?: string;
}
