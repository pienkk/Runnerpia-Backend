import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserKakaoDto } from '../user/dto/kakao-user.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(loginUserDto: LoginUserDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(user: any): Promise<void>;
    kakaoLogin(userKakaoDto: UserKakaoDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: string, refresh_token: string): Promise<void>;
    refreshTokens(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashData(data: string): any;
    getTokens(userId: string, nickname: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
