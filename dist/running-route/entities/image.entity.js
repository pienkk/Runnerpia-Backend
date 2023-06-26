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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const running_route_entity_1 = require("./running-route.entity");
const TimeAbs_1 = require("../../common/entities/TimeAbs");
let Image = class Image extends TimeAbs_1.TimeAbs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'route_image' }),
    __metadata("design:type", String)
], Image.prototype, "routeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Image.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'running_route_id' }),
    __metadata("design:type", Number)
], Image.prototype, "runningRouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => running_route_entity_1.RunningRoute, (runningRoute) => runningRoute.images, {
        cascade: ['soft-remove'],
    }),
    (0, typeorm_1.JoinColumn)({ name: 'running_route_id', referencedColumnName: 'id' }),
    __metadata("design:type", running_route_entity_1.RunningRoute)
], Image.prototype, "runningRoute", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)('images')
], Image);
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map