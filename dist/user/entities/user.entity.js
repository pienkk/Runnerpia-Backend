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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const running_route_entity_1 = require("../../running-route/entities/running-route.entity");
const bookmark_entity_1 = require("./bookmark.entity");
const like_entity_1 = require("./like.entity");
const user_recommended_tag_entity_1 = require("./user-recommended-tag.entity");
const user_secure_tag_entity_1 = require("./user-secure-tag.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let User = class User extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        comment: '유저 아이디',
        name: 'user_idx',
    }),
    __metadata("design:type", Number)
], User.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true, comment: '유저 이름' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '유저 닉네임' }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '유저 아이디' }),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, comment: '유저 비밀번호' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "numberOfUse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, comment: '유저 생년월일' }),
    __metadata("design:type", Number)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['F', 'M'],
        nullable: true,
        comment: '유저 성별',
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, comment: '유저 도시' }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, comment: '유저 군' }),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => running_route_entity_1.RunningRoute, (runningRoute) => runningRoute.user),
    __metadata("design:type", Array)
], User.prototype, "runningRoutes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.Bookmark, (bookmark) => bookmark.user),
    __metadata("design:type", Array)
], User.prototype, "bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_recommended_tag_entity_1.UserRecommendedTag, (userRecommendedTag) => userRecommendedTag.user),
    __metadata("design:type", Array)
], User.prototype, "userRecommendedTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_secure_tag_entity_1.UserSecureTag, (userSecureTag) => userSecureTag.user),
    __metadata("design:type", Array)
], User.prototype, "userSecureTags", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map