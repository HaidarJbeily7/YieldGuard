import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { ReportingController } from './controller';
import { ReportingService } from './service';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        ReportingService
    ],
    controllers: [
        ReportingController
    ],
    exports: []
})
export class ReportingModule { }
