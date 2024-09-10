import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

// experimental safety
interface ClassConstractor {
    new (...arg: any []): {}
}

export function Serialize(dto: ClassConstractor) {
    return UseInterceptors(new SerializerInterceptor(dto))
}

export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> { 
        return next.handle().pipe(
            map((data: any) =>  {
                return plainToInstance(this.dto, data, { excludeExtraneousValues: true, })
            })
        )
    }
}