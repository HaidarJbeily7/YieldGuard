import { ApiProperty } from '@nestjs/swagger';
import { Report } from '@prisma/client';


export enum ReportType {
    USER_REPORT = 'USER_REPORT'
}

export class ReportingData {

    public static readonly NAME_LENGTH = 50;

    @ApiProperty({ description: 'Report unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Report type', enum: ReportType })
    public readonly reportType: ReportType;

    @ApiProperty({ description: 'Report data' })
    public readonly reportData: string;

    @ApiProperty({ description: 'User ID' })
    public readonly userId: number;

    public constructor(entity: Report) {
        this.id = entity.id;
        this.reportType = entity.reportType as ReportType;
        this.reportData = entity.reportData;
        this.userId = entity.userId;
    }

}
