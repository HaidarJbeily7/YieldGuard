import { ApiProperty } from '@nestjs/swagger';

export class VerifyNearAccountDto {
    @ApiProperty()
    readonly challenge: string;

    @ApiProperty()
    readonly signature: string;

    @ApiProperty()
    readonly publicKey: string;

    @ApiProperty()
    readonly nearWallet: string;
} 