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
exports.UserSecureTag = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let UserSecureTag = class UserSecureTag extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserSecureTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], UserSecureTag.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_idx', comment: '유저 아이디' }),
    __metadata("design:type", Number)
], UserSecureTag.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userSecureTags, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserSecureTag.prototype, "user", void 0);
UserSecureTag = __decorate([
    (0, typeorm_1.Entity)('user_secure_tags')
], UserSecureTag);
exports.UserSecureTag = UserSecureTag;
//# sourceMappingURL=user-secure-tag.entity.js.map