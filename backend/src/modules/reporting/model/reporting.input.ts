import { PickType } from '@nestjs/swagger';
import { ReportingData } from './reporting.data';

export class ReportingInput extends PickType(ReportingData, ['reportType', 'reportData', 'userId'] as const) {}
