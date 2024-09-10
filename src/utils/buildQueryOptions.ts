import { BaseQueryDto } from "src/base-dto/base-query.dto";
import { FindManyOptions, FindOptionsOrder} from "typeorm";

export function buildQueryOptions<T>(queryDto: BaseQueryDto, filters: any): FindManyOptions<T> {
    const { limit, offset, sortBy, sortOrder } = queryDto;
  
    const whereConditions = {
      ...filters
    };
  
    const options: FindManyOptions<T> = {
        skip: offset,
        take: limit,
        order: { [sortBy]: sortOrder.toUpperCase() } as FindOptionsOrder<T>,
        where: whereConditions,
    };
  
    return options;
}