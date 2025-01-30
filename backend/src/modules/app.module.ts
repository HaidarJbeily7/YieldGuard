import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common';
import { ReportingModule } from './reporting/reporting.module';

@Module({
    imports: [
        CommonModule,
        ReportingModule,
        AuthModule
    ]
})
export class ApplicationModule {}
