import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { VerifyNearAccountDto } from '../dto/verify-near-account.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('verify')
    @ApiOperation({ summary: 'Verify NEAR account ownership' })
    @ApiResponse({ status: 200, description: 'Returns JWT token if verification successful' })
    async verifyNearAccount(@Body() dto: VerifyNearAccountDto) {
        const isValid = await this.authService.verifyNearAccount(
            dto.challenge,
            dto.signature,
            dto.publicKey
        );

        if (!isValid) {
            throw new UnauthorizedException('Invalid signature');
        }

        const token = await this.authService.createAuthToken(dto.nearWallet);
        return { token };
    }
} 