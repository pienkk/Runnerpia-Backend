"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy) {
    constructor(authService) {
        super({
            clientID: process.env.KAKAO_ID,
            callbackURL: process.env.KAKAO_REDIRECT,
        });
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const profileJson = profile._json;
        const payload = {
            kakaoId: profileJson.id,
            accessToken,
            refreshToken,
        };
        done(null, payload);
    }
}
exports.KakaoStrategy = KakaoStrategy;
//# sourceMappingURL=kakao.strategy.js.map