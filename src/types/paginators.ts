import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsObject,
  ValidateNested,
  IsString,
  IsNotEmpty,
} from 'class-validator';

enum PageSizes {
  small = 20,
  medium = 30,
  large = 50,
}

enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

class Page {
  @ApiProperty({ example: PageSizes.small })
  @IsEnum(PageSizes)
  readonly size: PageSizes;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  readonly index: number;
}

class Order {
  @ApiProperty({ example: OrderDirection.ASC })
  @IsEnum(OrderDirection)
  readonly direction: OrderDirection;

  @ApiProperty({ example: 'lastName' })
  @IsString()
  @IsNotEmpty()
  readonly byColumn: string;
}

export class Paginators {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  readonly order: Order;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Page)
  readonly page: Page;
}
