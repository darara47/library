import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsObject,
  ValidateNested,
  IsString,
} from 'class-validator';

enum PageSizes {
  small = 20,
  medium = 50,
  large = 100,
}

enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

class Page {
  @IsEnum(PageSizes)
  readonly size: PageSizes;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly index: number;
}

class Order {
  @IsEnum(OrderDirection)
  readonly direction: OrderDirection;

  @IsString()
  readonly byColumn: unknown;
}

export class Paginators {
  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  readonly order: Order;

  @IsObject()
  @ValidateNested()
  @Type(() => Page)
  readonly page: Page;
}

// {
//   "paginators": {
//     "order": {
//       "byColumn": "test",
//       "direction": "ASC"
//     },
//     "page": {
//       "size": 20,
//       "index": 2
//     }
//   }
// }
