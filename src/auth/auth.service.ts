import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    signUp(authcredDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authcredDto)
    }

    async signIn(authcredDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authcredDto)

        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)
        this.logger.debug(`Generated JWT token with payload - ${JSON.stringify(payload)}`)

        return { accessToken }
    }
}
