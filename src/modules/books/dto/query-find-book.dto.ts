import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Paginators } from 'src/types/paginators';

class Filters {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  genre: string;
}

export class QueryFindBookDto {
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
//     "title": "",
//     "genre": ""
//   },
//   "paginators": {
//     "order": {
//       "byColumn": "title",
//       "direction": "ASC"
//     },
//     "page": {
//       "size": 20,
//       "index": 1
//     }
//   }
// }
