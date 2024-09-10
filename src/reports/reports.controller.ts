import { 
    Controller, 
    Post, 
    Body, 
    UseGuards, 
    Patch, 
    Param,
    Get,
    Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReporstService } from './reporst.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/users.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/inreceptors/serialize.interseptors';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { SortDto } from './dtos/sort.dto';
import { FilterDto } from './dtos/filter.dto';
import { BaseQueryDto } from 'src/base-dto/base-query.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReporstService) {}

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportService.createEstimate(query);
    }

    // test
    // @Get('firtable')
    // getFilterableAll(
    //     @Query() paginationDto: PaginationDto, 
    //     @Query() sortDto: SortDto, 
    //     @Query() filterDto: FilterDto) {
    //         const { limit, offset } = paginationDto;
    //         const { sortBy, sortOrder } = sortDto;
    //         const filters = filterDto;
    //         return this.reportService.filteredAll({ limit, offset, sortBy, sortOrder, filters })
    // }

    @Get('firtable')
    getFilterableAll(
        @Query() BaseQueryDto: BaseQueryDto, 
        @Query() filterDto: FilterDto) {
            return this.reportService.filteredAll(BaseQueryDto, filterDto)
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReports(@Param('id') id: string, @Body() approve: ApproveReportDto) {
        return this.reportService.changeApproval(id, approve.approved);
    }
}
