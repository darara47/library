import { Type } from 'class-transformer';
import {
  IsDateString,
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

  @IsDateString()
  @IsOptional()
  birthDate: Date;

  @IsDateString()
  @IsOptional()
  deathDate: Date;
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
//     "name": "henryk"
//   },
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
