import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ReportingModule } from './reporting/reporting.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CommonModule,
        ReportingModule,
        AuthModule
    ]
})
export class ApplicationModule {}
