import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../common';

@Injectable()
export class AuthService {
    public constructor(private readonly prisma: PrismaService) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public verifyNearAccount(_challenge: string, _signature: string, _publicKey: string): boolean {
        try {
            // const publicKey = PublicKey.from(publicKey);

            // const signature = Signature.from(signature);
            // publicKey.verify(signature, challenge);
            return true;
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
