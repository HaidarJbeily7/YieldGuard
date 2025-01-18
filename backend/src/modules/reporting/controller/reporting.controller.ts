import { Body, Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service } from '../../tokens';
import { ReportingPipe } from '../flow';
import { ReportingData, ReportingInput } from '../model';
import { ReportingService } from '../service';

@Controller('reporting')
@ApiTags('reporting')
@ApiBearerAuth()
export class ReportingController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly reportingService: ReportingService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Find passengers' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ReportingData })
    public async find(): Promise<ReportingData[]> {

        return this.reportingService.find();
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create Reporting' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ReportingData })
    public async create(@Body(ReportingPipe) input: ReportingInput): Promise<ReportingData> {

        if (this.config.PASSENGERS_ALLOWED === 'no') {
            throw new PreconditionFailedException('Not allowed to onboard passengers');
        }

        const passenger = await this.reportingService.create(input);
        this.logger.info(`Created new passenger with ID ${passenger.id}`);

        return passenger;
    }

}
