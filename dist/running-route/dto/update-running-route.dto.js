"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRunningRouteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_running_route_dto_1 = require("./create-running-route.dto");
class UpdateRunningRouteDto extends (0, mapped_types_1.PickType)((0, mapped_types_1.PartialType)(create_running_route_dto_1.CreateRunningRouteDto), ['review', 'recommendedTags', 'secureTags', 'files']) {
}
exports.UpdateRunningRouteDto = UpdateRunningRouteDto;
//# sourceMappingURL=update-running-route.dto.js.map