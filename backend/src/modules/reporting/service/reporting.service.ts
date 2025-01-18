import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { ReportingData, ReportingInput } from '../model';

@Injectable()
export class ReportingService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all reports in the database
     *
     * @returns A report list
     */
    public async find(): Promise<ReportingData[]> {

        const reports = await this.prismaService.report.findMany();

        return reports.map(report => new ReportingData(report));
    }

    /**
     * Create a new report record
     *
     * @param data Reporting details
     * @returns A report created in the database
     */
    public async create(data: ReportingInput): Promise<ReportingData> {

        const report = await this.prismaService.report.create({
            data: {
                reportType: data.reportType,
                reportData: data.reportData,
                userId: data.userId
            }
        });

        return new ReportingData(report);
    }

}
