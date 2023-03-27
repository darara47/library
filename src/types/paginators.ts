import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsOptional, Max } from 'class-validator';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class Paginators {
  @ApiProperty({
    default: 10,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  @IsPositive()
  @Max(1000)
  readonly limit: number = 10;

  @ApiProperty({
    default: OrderDirection.ASC,
    enum: OrderDirection,
    required: false,
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  readonly orderDirection: OrderDirection = OrderDirection.ASC;

  @ApiProperty({ default: 1, required: false })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  @IsPositive()
  readonly page: number = 1;
}

export class PagesResponse {
  @ApiProperty()
  readonly current: number;

  @ApiProperty()
  readonly hasPrevious: boolean;

  @ApiProperty()
  readonly hasNext: boolean;

  @ApiProperty()
  readonly total: number;
}

export const getPagesResponse = (
  dataLength: number,
  limit: number,
  page: number,
): PagesResponse => {
  const totalPages = Math.ceil(dataLength / limit);
  return {
    current: page,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    total: totalPages,
  };
};
