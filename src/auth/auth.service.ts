import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    signUp(authcredDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authcredDto)
    }

    signIn(authcredDto: AuthCredentialsDto): Promise<string> {
        return this.userRepository.validateUserPassword(authcredDto)
    }
}
