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
  @IsEnum(PageSizes)
  readonly size: PageSizes;

  @IsNumber()
  @IsPositive()
  readonly index: number;
}

class Order {
  @IsEnum(OrderDirection)
  readonly direction: OrderDirection;

  @IsString()
  @IsNotEmpty()
  readonly byColumn: string;
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
