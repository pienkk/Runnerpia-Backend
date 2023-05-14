import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<void>;
    getProfile(req: any): any;
    kakaoLogin(): Promise<HttpStatus>;
    kakaoLoginCallback(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getKakaoProfile(req: any): any;
    getToken(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
