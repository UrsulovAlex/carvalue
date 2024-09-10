import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReporstService } from './reporst.service';
import { ReportEntity } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportsController],
  providers: [ReporstService]
})
export class ReportsModule {}
