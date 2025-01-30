import { Injectable } from '@nestjs/common';
import { verify } from '@near-js/crypto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../common';

@Injectable()
export class AuthService {
    public constructor(private readonly prisma: PrismaService) {}

    public async verifyNearAccount(challenge: string, signature: string, publicKey: string): Promise<boolean> {
        try {
            const result = verify(Buffer.from(signature, 'base64'), Buffer.from(challenge), publicKey);
            return Boolean(result);
        } catch {
            return false;
        }
    }

    public async createAuthToken(nearWallet: string): Promise<string> {
        const user = await this.prisma.user.upsert({
            where: { nearWallet },
            update: { lastSignIn: new Date() },
            create: { nearWallet }
        });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }

        return jwt.sign(
            { userId: user.id, nearWallet, role: 'restricted' },
            jwtSecret,
            {
                algorithm: 'HS256',
                issuer: process.env.JWT_ISSUER,
                expiresIn: '24h'
            }
        );
    }
} 