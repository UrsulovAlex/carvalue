import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity'
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { BaseQueryDto } from 'src/base-dto/base-query.dto';
import { FilterDto } from './dtos/filter.dto';
import { buildQueryOptions } from 'src/utils/buildQueryOptions';

@Injectable()
export class ReporstService {
    constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select('AVG(price)', 'price')
            // .select('*')
            .where('make =:make', { make })
            .andWhere('model =:model', { model })
            .andWhere('lng -:lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
            .andWhere('year -:year BETWEEN -3 AND 3', { year })
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            // .orderBy('ABS(year - :year)', 'ASC')
            // .getRawMany()
            .andWhere('approved IS TRUE')
            .setParameters({mileage})
            .limit(3)
            .getRawOne();
    }

    // async filteredAll({ limit = 50, offset = 0, sortBy = 'price', sortOrder = 'asc', filters }) {
    //     const whereConditions = Object.assign(filters);

    //     return await this.repo.find({
    //         skip: offset,
    //         take: limit,
    //         order: {
    //           [sortBy]: sortOrder.toUpperCase(),
    //         },
    //         where: whereConditions,
    //     });
    // }

    async filteredAll(baseQueryDto: BaseQueryDto, filter: FilterDto) {
        const options = buildQueryOptions<ReportEntity>(baseQueryDto, filter);
        return await this.repo.find(options);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
     
        if(!report) {
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return this.repo.save(report);
    }
}
