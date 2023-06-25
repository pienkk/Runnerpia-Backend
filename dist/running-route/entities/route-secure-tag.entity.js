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
exports.RouteSecureTag = void 0;
const typeorm_1 = require("typeorm");
const running_route_entity_1 = require("./running-route.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let RouteSecureTag = class RouteSecureTag extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], RouteSecureTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RouteSecureTag.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'running_route_id',
    }),
    __metadata("design:type", Number)
], RouteSecureTag.prototype, "runningRouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => running_route_entity_1.RunningRoute, (runningRoute) => runningRoute.routeSecureTags, {
        cascade: ['soft-remove'],
    }),
    (0, typeorm_1.JoinColumn)({ name: 'running_route_id' }),
    __metadata("design:type", running_route_entity_1.RunningRoute)
], RouteSecureTag.prototype, "runningRoute", void 0);
RouteSecureTag = __decorate([
    (0, typeorm_1.Entity)()
], RouteSecureTag);
exports.RouteSecureTag = RouteSecureTag;
//# sourceMappingURL=route-secure-tag.entity.js.map