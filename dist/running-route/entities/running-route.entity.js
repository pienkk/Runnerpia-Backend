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
const wkx_1 = require("wkx");
const user_entity_1 = require("../../user/entities/user.entity");
const bookmark_entity_1 = require("../../user/entities/bookmark.entity");
const like_entity_1 = require("../../user/entities/like.entity");
const route_recommended_tag_entity_1 = require("./route-recommended-tag.entity");
const route_secure_tag_entity_1 = require("./route-secure-tag.entity");
const image_entity_1 = require("./image.entity");
let RunningRoute = RunningRoute_1 = class RunningRoute {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RunningRoute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], RunningRoute.prototype, "routeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'point' }),
    __metadata("design:type", wkx_1.Geometry)
], RunningRoute.prototype, "startPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'linestring',
    }),
    __metadata("design:type", wkx_1.Geometry)
], RunningRoute.prototype, "arrayOfPos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "runningTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], RunningRoute.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], RunningRoute.prototype, "distance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], RunningRoute.prototype, "runningDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "routeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "firstLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "secondLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RunningRoute.prototype, "thirdLocation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RunningRoute.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RunningRoute.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.runningRoutes),
    __metadata("design:type", user_entity_1.User)
], RunningRoute.prototype, "user", void 0);
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
    (0, typeorm_1.ManyToOne)(() => RunningRoute_1, (runningRoute) => runningRoute.subRoute),
    __metadata("design:type", RunningRoute)
], RunningRoute.prototype, "mainRoute", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RunningRoute_1, (runningRoute) => runningRoute.mainRoute),
    __metadata("design:type", Array)
], RunningRoute.prototype, "subRoute", void 0);
RunningRoute = RunningRoute_1 = __decorate([
    (0, typeorm_1.Entity)()
], RunningRoute);
exports.RunningRoute = RunningRoute;
//# sourceMappingURL=running-route.entity.js.map