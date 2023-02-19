import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Paginators } from 'src/types/paginators';

class Filters {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isAlive: boolean;
}

export class QueryFindAuthorDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Filters)
  readonly filters: Filters;

  @IsObject()
  @ValidateNested()
  @Type(() => Paginators)
  readonly paginators: Paginators;
}

// {
//   "filters": {
//     "name": "a",
//     "isAlive": true
//   },
//   "paginators": {
//     "order": {
//       "byColumn": "firstName",
//       "direction": "DESC"
//     },
//     "page": {
//       "size": 20,
//       "index": 1
//     }
//   }
// }
