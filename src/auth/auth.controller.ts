import { Controller, Post, Body, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('signup')
    signUp(@Body(ValidationPipe) authCredDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredDto)
    }

    @Post('signin')
    async signIn(@Body(ValidationPipe) authCredDto: AuthCredentialsDto): Promise<void> {
        const username = await this.authService.signIn(authCredDto)
        
        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }
    }
}
