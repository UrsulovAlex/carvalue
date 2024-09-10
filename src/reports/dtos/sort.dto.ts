import { IsOptional, IsString } from 'class-validator';

export class SortDto {
  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  sortOrder: 'asc' | 'desc';
}