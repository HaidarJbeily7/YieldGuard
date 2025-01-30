import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { Role } from '../../tokens';
import { extractTokenPayload } from './security-utils';

@Injectable()
export class RestrictedGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean {

        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) {
            return false;
        }

        // @ts-expect-error it's ok
        return payload.role === Role.RESTRICTED && payload.nearWallet !== undefined;
    }

}
