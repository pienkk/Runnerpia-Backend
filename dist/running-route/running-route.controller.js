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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunningRouteController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_form_data_1 = require("nestjs-form-data");
const city_query_string_dto_1 = require("./dto/city-query-string.dto");
const create_running_route_dto_1 = require("./dto/create-running-route.dto");
const location_query_string_dto_1 = require("./dto/location-query-string.dto");
const update_running_route_dto_1 = require("./dto/update-running-route.dto");
const running_route_service_1 = require("./running-route.service");
let RunningRouteController = class RunningRouteController {
    constructor(runningRouteService) {
        this.runningRouteService = runningRouteService;
    }
    async create(createRunningRouteDto) {
        return await this.runningRouteService.create(createRunningRouteDto);
    }
    async getPopularTags() {
        return await this.runningRouteService.getPopularTags();
    }
    async searchBasedOnLocation(searchQueryStringDto) {
        return await this.runningRouteService.searchBasedOnLocation(searchQueryStringDto);
    }
    async searchBasedOnCity(cityQueryStringDto) {
        return await this.runningRouteService.searchBasedOnCity(cityQueryStringDto);
    }
    async getAllSubRoute(req) {
        return await this.runningRouteService.getAllSubRoute('hongildong');
    }
    async getAllMainRoute(req) {
        return await this.runningRouteService.getAllMainRoute('hongildong');
    }
    async checkRunningExperience(id, req) {
        return await this.runningRouteService.checkRunningExperience(id, 'hongildong');
    }
    async getMainRouteDetail(id) {
        return await this.runningRouteService.getMainRouteDetail(id);
    }
    async getById(id) {
        return await this.runningRouteService.getById(id);
    }
    async checkRouteName(routeName) {
        return await this.runningRouteService.checkRouteName(routeName);
    }
    async getRecommendedRoute(locationQueryStringDto) {
        return await this.runningRouteService.getRecommendedRoute(locationQueryStringDto);
    }
    async update(id, updateRunningRouteDto) {
        return await this.runningRouteService.update(id, updateRunningRouteDto);
    }
    async delete(id) {
        return await this.runningRouteService.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_running_route_dto_1.CreateRunningRouteDto]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/popularTags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getPopularTags", null);
__decorate([
    (0, common_1.Get)('/searchLocation'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_query_string_dto_1.LocationQueryStringDto]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "searchBasedOnLocation", null);
__decorate([
    (0, common_1.Get)('/searchCity'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [city_query_string_dto_1.CityQueryStringDto]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "searchBasedOnCity", null);
__decorate([
    (0, common_1.Get)('/allSubRoute'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getAllSubRoute", null);
__decorate([
    (0, common_1.Get)('/allMainRoute'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getAllMainRoute", null);
__decorate([
    (0, common_1.Get)('/checkRunningExperience/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "checkRunningExperience", null);
__decorate([
    (0, common_1.Get)('/main/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getMainRouteDetail", null);
__decorate([
    (0, common_1.Get)('/sub/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/checkRouteName'),
    __param(0, (0, common_1.Query)('routeName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "checkRouteName", null);
__decorate([
    (0, common_1.Get)('/recommendedRoute'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_query_string_dto_1.LocationQueryStringDto]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "getRecommendedRoute", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_running_route_dto_1.UpdateRunningRouteDto]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RunningRouteController.prototype, "delete", null);
RunningRouteController = __decorate([
    (0, common_1.Controller)('running-route'),
    __metadata("design:paramtypes", [running_route_service_1.RunningRouteService])
], RunningRouteController);
exports.RunningRouteController = RunningRouteController;
//# sourceMappingURL=running-route.controller.js.map