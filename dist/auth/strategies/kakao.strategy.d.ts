import { AuthService } from '../auth.service';
declare const KakaoStrategy_base: new (...args: any[]) => any;
export declare class KakaoStrategy extends KakaoStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(accessToken: any, refreshToken: any, profile: any, done: any): Promise<void>;
}
export {};
