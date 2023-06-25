"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunningRouteModule = void 0;
const common_1 = require("@nestjs/common");
const running_route_controller_1 = require("./running-route.controller");
const running_route_service_1 = require("./running-route.service");
const typeorm_1 = require("@nestjs/typeorm");
const running_route_entity_1 = require("./entities/running-route.entity");
const nestjs_form_data_1 = require("nestjs-form-data");
const image_entity_1 = require("./entities/image.entity");
const route_secure_tag_entity_1 = require("./entities/route-secure-tag.entity");
const route_recommended_tag_entity_1 = require("./entities/route-recommended-tag.entity");
const running_route_path_entity_1 = require("./entities/running-route-path.entity");
let RunningRouteModule = class RunningRouteModule {
};
RunningRouteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                running_route_entity_1.RunningRoute,
                route_secure_tag_entity_1.RouteSecureTag,
                route_recommended_tag_entity_1.RouteRecommendedTag,
                image_entity_1.Image,
                running_route_path_entity_1.RunningRoutePath,
            ]),
            nestjs_form_data_1.NestjsFormDataModule.config({ storage: nestjs_form_data_1.MemoryStoredFile }),
        ],
        controllers: [running_route_controller_1.RunningRouteController],
        providers: [running_route_service_1.RunningRouteService],
    })
], RunningRouteModule);
exports.RunningRouteModule = RunningRouteModule;
//# sourceMappingURL=running-route.module.js.map