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
var RunningRoute_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunningRoute = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const bookmark_entity_1 = require("../../user/entities/bookmark.entity");
const like_entity_1 = require("../../user/entities/like.entity");
const route_recommended_tag_entity_1 = require("./route-recommended-tag.entity");
const route_secure_tag_entity_1 = require("./route-secure-tag.entity");
const image_entity_1 = require("./image.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
const running_route_path_entity_1 = require("./running-route-path.entity");
let RunningRoute = RunningRoute_1 = class RunningRoute extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        comment: '경로 아이디',
    }),
    __metadata("design:type", Number)
], RunningRoute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        unique: true,
        name: 'route_name',
        comment: '경로 이름',
    }),
    __metadata("design:type", String)
], RunningRoute.prototype, "routeName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 8,
        name: 'start_latitude',
        comment: '경로 시작 위도',
    }),
    __metadata("design:type", String)
], RunningRoute.prototype, "startLatitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 11,
        scale: 8,
        name: 'start_logitude',
        comment: '경로 시작 경도',
    }),
    __metadata("design:type", String)
], RunningRoute.prototype, "startLongitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', name: 'running_time', comment: '러닝 시간' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "runningTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: '리뷰' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', comment: '거리' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "distance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'running_date', comment: '러닝 날짜' }),
    __metadata("design:type", Date)
], RunningRoute.prototype, "runningDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RunningRoute.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '위치' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'user_id',
        comment: '유저 아이디',
    }),
    __metadata("design:type", Number)
], RunningRoute.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.Bookmark, (bookmark) => bookmark.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => route_recommended_tag_entity_1.RouteRecommendedTag, (tag) => tag.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "routeRecommendedTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => route_secure_tag_entity_1.RouteSecureTag, (tag) => tag.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "routeSecureTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RunningRoute_1, (runningRoute) => runningRoute.mainRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "subRoute", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => running_route_path_entity_1.RunningRoutePath, (runningRoutePath) => runningRoutePath.runningRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "runningRoutePaths", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.runningRoutes),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], RunningRoute.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RunningRoute_1, (runningRoute) => runningRoute.subRoute),
    __metadata("design:type", RunningRoute)
], RunningRoute.prototype, "mainRoute", void 0);
RunningRoute = RunningRoute_1 = __decorate([
    (0, typeorm_1.Entity)('running_routes')
], RunningRoute);
exports.RunningRoute = RunningRoute;
//# sourceMappingURL=running-route.entity.js.map