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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const user_recommended_tag_entity_1 = require("./entities/user-recommended-tag.entity");
const user_secure_tag_entity_1 = require("./entities/user-secure-tag.entity");
const bookmark_entity_1 = require("./entities/bookmark.entity");
const running_route_entity_1 = require("../running-route/entities/running-route.entity");
const response_user_dto_1 = require("./dto/response-user.dto");
let UserService = class UserService {
    constructor(userRepository, userRecommendedTagRepository, userSecureTagRepository, bookmarkRepository, runningRouteRepository) {
        this.userRepository = userRepository;
        this.userRecommendedTagRepository = userRecommendedTagRepository;
        this.userSecureTagRepository = userSecureTagRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.runningRouteRepository = runningRouteRepository;
    }
    async updateTagsInfo(userDto) {
        if (userDto.recommendedTags) {
            userDto.recommendedTags.map(async (tag) => {
                const t = new user_recommended_tag_entity_1.UserRecommendedTag();
                t.index = +tag;
                t.user = await this.userRepository.findOneBy({
                    userId: userDto.userId,
                });
                await this.userRecommendedTagRepository.save(t);
            });
        }
        if (userDto.secureTags) {
            userDto.secureTags.map(async (tag) => {
                const t = new user_secure_tag_entity_1.UserSecureTag();
                t.index = +tag;
                t.user = await this.userRepository.findOneBy({
                    userId: userDto.userId,
                });
                await this.userSecureTagRepository.save(t);
            });
        }
    }
    async createUser(createUserDto) {
        const isExist = await this.userRepository.findOneBy({
            userId: createUserDto.userId,
        });
        if (isExist) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Already registered userId'],
                error: 'Forbidden',
            });
        }
        if (!(createUserDto.gender === 'F' || createUserDto.gender === 'M')) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['gender must be F or M'],
                error: 'Forbidden',
            });
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.save(createUserDto);
        await this.updateTagsInfo(createUserDto);
        return response_user_dto_1.ResponseCreateUserDto.fromEntity(user);
    }
    async update(userId, updateUserDto) {
        const { name, nickname, password, birthDate, gender } = updateUserDto;
        const user = await this.userRepository.findOneBy({
            userId: updateUserDto.userId,
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['Register user first'],
                error: 'NotFound',
            });
        }
        if (updateUserDto.userId !== undefined) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ["Can't update userID"],
                error: 'Forbidden',
            });
        }
        if (updateUserDto.password !== undefined) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(userId, {
            name,
            nickname,
            password,
            birthDate,
            gender,
        });
        const recommendedTagsBefore = await this.userRecommendedTagRepository
            .createQueryBuilder('userRecommendedTag')
            .leftJoinAndSelect('userRecommendedTag.user', 'user')
            .where('user.userId = :userId', { userId: userId })
            .select('userRecommendedTag.id', 'id')
            .execute();
        const secureTagsBefore = await this.userSecureTagRepository
            .createQueryBuilder('userSecureTag')
            .leftJoinAndSelect('userSecureTag.user', 'user')
            .where('user.userId = :userId', { userId: userId })
            .select('userSecureTag.id', 'id')
            .execute();
        if (recommendedTagsBefore.length > 0)
            await this.userRecommendedTagRepository.delete(recommendedTagsBefore);
        if (secureTagsBefore.length > 0)
            await this.userSecureTagRepository.delete(secureTagsBefore);
        await this.updateTagsInfo(updateUserDto);
    }
    async remove(userId) {
        await this.userRepository.delete(userId);
    }
    async getBookmarks(userId) {
        const bookmarks = await this.bookmarkRepository
            .createQueryBuilder('bookmark')
            .leftJoinAndSelect('bookmark.user', 'user')
            .where('user.userId = :userId', { userId: userId })
            .select('bookmark.runningRoute')
            .execute();
        return bookmarks;
    }
    async createBookmark(createBookmarkDto, userId) {
        const user = await this.userRepository.findOneBy({
            userId: userId,
        });
        if (!user) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Wrong userId'],
                error: 'Forbidden',
            });
        }
        const runningRoute = await this.runningRouteRepository.findOne({
            where: { id: createBookmarkDto.runningRoute },
        });
        if (!runningRoute) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Wrong running route id'],
                error: 'Forbidden',
            });
        }
        const isExist = await this.bookmarkRepository
            .createQueryBuilder('bookmark')
            .where('bookmark.user =:userId', { userId: userId })
            .andWhere('bookmark.runningRoute =:runningRoute', {
            runningRoute: createBookmarkDto.runningRoute,
        })
            .execute();
        if (isExist && isExist.length > 0) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Already registered running route'],
                error: 'Forbidden',
            });
        }
        const bookmark = new bookmark_entity_1.Bookmark();
        bookmark.user = user;
        bookmark.runningRoute = runningRoute;
        const result = await this.bookmarkRepository.save(bookmark);
        return result.id;
    }
    async deleteBookmark(deleteBookmarkDto, userId) {
        const isExist = await this.bookmarkRepository
            .createQueryBuilder('bookmark')
            .where('bookmark.user =:userId', { userId: userId })
            .andWhere('bookmark.runningRoute =:runningRoute', {
            runningRoute: deleteBookmarkDto.runningRoute,
        })
            .execute();
        if (isExist && isExist.length === 0) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['No running route exist'],
                error: 'Forbidden',
            });
        }
        await this.bookmarkRepository.delete(isExist[0].bookmark_id);
    }
    async getUseRecommended(userId) {
        const useRecommended = await this.userRepository
            .createQueryBuilder('user')
            .where('user.userId = :userId', { userId: userId })
            .select('user.numberOfUse')
            .execute();
        return useRecommended;
    }
    async increaseUseRecommended(userId) {
        await this.userRepository.increment({ userId: userId }, 'numberOfUse', 1);
    }
    async checkId(userId) {
        const isExist = await this.userRepository.findOneBy({
            userId: userId,
        });
        if (isExist) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Already registered userId'],
                error: 'Forbidden',
            });
        }
    }
    async checkNickname(nickname) {
        const isExist = await this.userRepository.findOneBy({
            nickname: nickname,
        });
        if (isExist) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Already registered nickname'],
                error: 'Forbidden',
            });
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_recommended_tag_entity_1.UserRecommendedTag)),
    __param(2, (0, typeorm_1.InjectRepository)(user_secure_tag_entity_1.UserSecureTag)),
    __param(3, (0, typeorm_1.InjectRepository)(bookmark_entity_1.Bookmark)),
    __param(4, (0, typeorm_1.InjectRepository)(running_route_entity_1.RunningRoute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map