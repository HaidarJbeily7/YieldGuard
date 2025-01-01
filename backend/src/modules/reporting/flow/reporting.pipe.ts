import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ReportingInput, ReportType } from '../model';

export class ReportingPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<ReportingInput>({
            // @todo When building input validation, also include regex
            // and other techniques for optimal security
            reportType: Joi.string().valid(...Object.values(ReportType)).required(),
            reportData: Joi.string().required(),
            userId: Joi.number().required()
        });

    }
}
