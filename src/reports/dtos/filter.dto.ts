import { 
    IsOptional, 
    IsString,
    IsNumber,
    Min,
    Max,
    IsLatitude,
    IsLongitude
} from 'class-validator';
import { Transform } from "class-transformer";

export class FilterDto {
  @IsOptional()
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}