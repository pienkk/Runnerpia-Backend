"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const running_route_entity_1 = require("./running-route/entities/running-route.entity");
const bookmark_entity_1 = require("./user/entities/bookmark.entity");
const like_entity_1 = require("./user/entities/like.entity");
const running_route_module_1 = require("./running-route/running-route.module");
const image_entity_1 = require("./running-route/entities/image.entity");
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const route_recommended_tag_entity_1 = require("./running-route/entities/route-recommended-tag.entity");
const route_secure_tag_entity_1 = require("./running-route/entities/route-secure-tag.entity");
const auth_module_1 = require("./auth/auth.module");
const user_recommended_tag_entity_1 = require("./user/entities/user-recommended-tag.entity");
const user_secure_tag_entity_1 = require("./user/entities/user-secure-tag.entity");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const config_1 = require("@nestjs/config");
const running_route_path_entity_1 = require("./running-route/entities/running-route-path.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory() {
                    return {
                        type: 'mysql',
                        host: process.env.MYSQLDB_HOST,
                        port: parseInt(process.env.MYSQLDB_DOCKER_PORT, 10),
                        username: process.env.MYSQLDB_USER,
                        password: process.env.MYSQLDB_PASSWORD,
                        database: process.env.MYSQLDB_DATABASE,
                        entities: [
                            user_entity_1.User,
                            user_recommended_tag_entity_1.UserRecommendedTag,
                            user_secure_tag_entity_1.UserSecureTag,
                            running_route_entity_1.RunningRoute,
                            bookmark_entity_1.Bookmark,
                            like_entity_1.Like,
                            route_recommended_tag_entity_1.RouteRecommendedTag,
                            route_secure_tag_entity_1.RouteSecureTag,
                            image_entity_1.Image,
                            running_route_path_entity_1.RunningRoutePath,
                        ],
                        synchronize: true,
                        logging: true,
                    };
                },
                async dataSourceFactory(options) {
                    if (!options) {
                        throw new Error('Invalid options passed');
                    }
                    return (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(options));
                },
            }),
            nestjs_redis_1.RedisModule.forRoot({
                config: {
                    host: process.env.REDIS_HOST,
                    port: parseInt(process.env.REDIS_DOCKER_PORT),
                },
            }),
            user_module_1.UserModule,
            running_route_module_1.RunningRouteModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map