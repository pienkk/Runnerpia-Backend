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
exports.UserRecommendedTag = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let UserRecommendedTag = class UserRecommendedTag extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserRecommendedTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], UserRecommendedTag.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id', comment: '유저 아이디' }),
    __metadata("design:type", Number)
], UserRecommendedTag.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userRecommendedTags, {
        cascade: ['soft-remove'],
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], UserRecommendedTag.prototype, "user", void 0);
UserRecommendedTag = __decorate([
    (0, typeorm_1.Entity)('user_recommended_tags')
], UserRecommendedTag);
exports.UserRecommendedTag = UserRecommendedTag;
//# sourceMappingURL=user-recommended-tag.entity.js.map