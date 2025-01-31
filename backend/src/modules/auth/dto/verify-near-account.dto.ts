import { ApiProperty } from '@nestjs/swagger';

export class VerifyNearAccountDto {
    @ApiProperty()
    public readonly challenge: string;

    @ApiProperty()
    public readonly signature: string;

    @ApiProperty()
    public readonly publicKey: string;

    @ApiProperty()
    public readonly nearWallet: string;
}
