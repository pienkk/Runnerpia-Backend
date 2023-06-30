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
exports.Like = void 0;
const typeorm_1 = require("typeorm");
const running_route_entity_1 = require("../../running-route/entities/running-route.entity");
const user_entity_1 = require("./user.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let Like = class Like extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Like.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'user_idx',
        comment: '유저 아이디',
    }),
    __metadata("design:type", Number)
], Like.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'running_route_id',
        comment: '러닝 경로 아이디',
    }),
    __metadata("design:type", Number)
], Like.prototype, "runningRouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.likes),
    (0, typeorm_1.JoinColumn)({ name: 'user_idx' }),
    __metadata("design:type", user_entity_1.User)
], Like.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => running_route_entity_1.RunningRoute, (runningRoute) => runningRoute.likes),
    (0, typeorm_1.JoinColumn)({ name: 'running_route_id', referencedColumnName: 'id' }),
    __metadata("design:type", running_route_entity_1.RunningRoute)
], Like.prototype, "runningRoute", void 0);
Like = __decorate([
    (0, typeorm_1.Entity)('likes')
], Like);
exports.Like = Like;
//# sourceMappingURL=like.entity.js.map