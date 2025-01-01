import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ReportingModule } from './reporting/reporting.module';

@Module({
    imports: [
        CommonModule,
        ReportingModule
    ]
})
export class ApplicationModule {}
