import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseQueryDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit: number = 50;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    offset: number = 0;
  
    @IsOptional()
    @IsString()
    sortBy: string = 'id';
  
    @IsOptional()
    @IsString()
    sortOrder: 'asc' | 'desc' = 'desc';
}