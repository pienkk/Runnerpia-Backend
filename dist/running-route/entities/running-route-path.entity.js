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
exports.RunningRoutePath = void 0;
const TimeAbs_1 = require("../../common/entities/TimeAbs");
const typeorm_1 = require("typeorm");
const running_route_entity_1 = require("./running-route.entity");
let RunningRoutePath = class RunningRoutePath extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        comment: '러닝 경로 아이디',
    }),
    __metadata("design:type", Number)
], RunningRoutePath.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 8,
        comment: '경로 위도',
    }),
    __metadata("design:type", String)
], RunningRoutePath.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 11,
        scale: 8,
        comment: '경로 경도',
    }),
    __metadata("design:type", String)
], RunningRoutePath.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        comment: '경로 순서',
    }),
    __metadata("design:type", Number)
], RunningRoutePath.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        comment: '경로 아이디',
        name: 'running_route_id',
    }),
    __metadata("design:type", Number)
], RunningRoutePath.prototype, "runningRouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => running_route_entity_1.RunningRoute, (runningRoute) => runningRoute.runningRoutePaths),
    (0, typeorm_1.JoinColumn)({ name: 'running_route_id', referencedColumnName: 'id' }),
    __metadata("design:type", running_route_entity_1.RunningRoute)
], RunningRoutePath.prototype, "runningRoute", void 0);
RunningRoutePath = __decorate([
    (0, typeorm_1.Entity)('running_route_paths')
], RunningRoutePath);
exports.RunningRoutePath = RunningRoutePath;
//# sourceMappingURL=running-route-path.entity.js.map