import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import * as jwt from 'jsonwebtoken';
import { verify } from '@near-js/crypto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async verifyNearAccount(challenge: string, signature: string, publicKey: string): Promise<boolean> {
        try {
            return verify(Buffer.from(signature, 'base64'), Buffer.from(challenge), publicKey);
        } catch {
            return false;
        }
    }

    async createAuthToken(nearWallet: string): Promise<string> {
        const user = await this.prisma.user.upsert({
            where: { nearWallet },
            update: { lastSignIn: new Date() },
            create: { nearWallet }
        });

        return jwt.sign(
            { userId: user.id, nearWallet, role: 'restricted' },
            process.env.JWT_SECRET!,
            { 
                algorithm: 'HS256',
                issuer: process.env.JWT_ISSUER,
                expiresIn: '24h'
            }
        );
    }
} 