"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(loginUserDto) {
        const user = await this.userRepository.findOneBy({
            userId: loginUserDto.userId,
        });
        if (!user) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Unregistered user'],
                error: 'Forbidden',
            });
        }
        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Wrong password'],
                error: 'Forbidden',
            });
        }
    }
    async login(user) {
        const tokens = await this.getTokens(user.userId, user.nickname);
        await this.updateRtHash(user.userId, tokens.refresh_token);
        return tokens;
    }
    async logout(user) {
        await this.userRepository.update({ userId: user.userId }, { currentHashedRefreshToken: null });
    }
    async kakaoLogin(userKakaoDto) {
        const user = await this.userRepository.findOneBy({
            userId: userKakaoDto.kakaoId,
        });
        if (user) {
            const tokens = await this.getTokens(user.userId, user.nickname);
            await this.updateRtHash(user.userId, tokens.refresh_token);
            return tokens;
        }
        const existUserNum = await this.userRepository.count({});
        const newUser = {
            userId: String(userKakaoDto.kakaoId),
            nickname: '달리는다람쥐' + String(existUserNum + 1),
        };
        try {
            await this.userRepository.save(newUser);
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException('Existing User');
            }
            else {
                console.log(e);
                throw new common_1.InternalServerErrorException();
            }
        }
        const tokens = await this.getTokens(newUser.userId, newUser.nickname);
        await this.updateRtHash(user.userId, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, refresh_token) {
        const hash = await this.hashData(refresh_token);
        await this.userRepository.update({ userId }, { currentHashedRefreshToken: hash });
    }
    async refreshTokens(user) {
        const isExist = await this.userRepository.findOneBy({
            userId: user.userId,
        });
        if (!isExist || !isExist.currentHashedRefreshToken)
            throw new common_1.ForbiddenException('Invalid credentials');
        const rtMatches = bcrypt.compare(user.refresh_token, isExist.currentHashedRefreshToken);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Invalid credentials');
        const tokens = await this.getTokens(user.userId, user.nickname);
        await this.updateRtHash(user.userId, tokens.refresh_token);
        return tokens;
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getTokens(userId, nickname) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({ userId: userId, nickname: nickname }, {
                expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            }),
            this.jwtService.signAsync({ userId: userId, nickname: nickname }, {
                expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map