/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { App } from 'supertest/types';
import { ApplicationModule } from '../../app.module';
import { ReportType } from '../model';

/**
 * Reporting API end-to-end tests
 *
 * This test suite performs end-to-end tests on the reporting API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('Reporting API', () => {

    let app: INestApplication;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        })
        .compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () =>
        app.close()
    );


    it('Should create new report in the API', async () => {

        const token = jwt.sign({ role: 'restricted' }, `${process.env.JWT_SECRET}`, {
            algorithm: 'HS256',
            issuer: `${process.env.JWT_ISSUER}`
        });

        return request(app.getHttpServer() as App)
            .post('/reporting')
            .set('Authorization', `Bearer ${token}`)
            .send({
                reportType: ReportType.USER_REPORT,
                reportData: 'Test report data',
                userId: 1
            })
            .expect(HttpStatus.CREATED)
            .then(response => {
                expect(response.body.reportType).toEqual(ReportType.USER_REPORT);
                expect(response.body.reportData).toEqual('Test report data');
                expect(response.body.userId).toEqual(1);
            });
    });

});
