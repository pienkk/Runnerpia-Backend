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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunningRouteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const running_route_entity_1 = require("./entities/running-route.entity");
const AWS = require("aws-sdk");
const image_entity_1 = require("./entities/image.entity");
const route_recommended_tag_entity_1 = require("./entities/route-recommended-tag.entity");
const route_secure_tag_entity_1 = require("./entities/route-secure-tag.entity");
const ioredis_1 = require("ioredis");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const running_route_path_entity_1 = require("./entities/running-route-path.entity");
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
});
const RECOMMENDEDTAG = 5;
const SECURETAG = 5;
const RADIUS = 30;
let RunningRouteService = class RunningRouteService {
    constructor(redis, dataSource, runningRouteRepository, routeRecommendedTagRepository, routeSecureTagRepository, imageRepository, runningRoutePathRepository) {
        this.redis = redis;
        this.dataSource = dataSource;
        this.runningRouteRepository = runningRouteRepository;
        this.routeRecommendedTagRepository = routeRecommendedTagRepository;
        this.routeSecureTagRepository = routeSecureTagRepository;
        this.imageRepository = imageRepository;
        this.runningRoutePathRepository = runningRoutePathRepository;
        this.runningRouteRepository = runningRouteRepository;
        this.routeRecommendedTagRepository = routeRecommendedTagRepository;
        this.routeSecureTagRepository = routeSecureTagRepository;
        this.imageRepository = imageRepository;
    }
    async uploadToAws(image) {
        const reg_for_extension = new RegExp('\\/(.*)\\;');
        const extension = reg_for_extension.exec(image)[1];
        const image_base64 = image.split(',')[1];
        const imageFile = Buffer.from(image_base64, 'base64');
        const key = `${Date.now() + `routeImage.${extension}`}`;
        await s3
            .putObject({
            Key: key,
            Body: imageFile,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ContentType: `image/${extension}`,
        }, (err) => {
            if (err) {
                throw err;
            }
        })
            .promise();
        const params = { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key };
        const imageUrl = await new Promise((r) => s3.getSignedUrl('getObject', params, async (err, url) => {
            if (err) {
                throw err;
            }
            r(url.split('?')[0]);
        }));
        const result = {
            url: imageUrl,
            key: key,
        };
        return result;
    }
    async deleteImageToAws(key) {
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        };
        await s3.deleteObject(deleteParams).promise();
    }
    async create(createRunningRouteDto) {
        var e_1, _a, e_2, _b;
        const { routeName, arrayOfPos, runningTime, review, distance, location, runningDate, recommendedTags, secureTags, files, mainRoute, } = createRunningRouteDto;
        if (mainRoute) {
            const route = await this.runningRouteRepository.findOneBy({
                id: mainRoute,
            });
            if (!route) {
                throw new common_1.ForbiddenException({
                    statusCode: common_1.HttpStatus.FORBIDDEN,
                    message: ['Not Existed mainRoute'],
                    error: 'Forbidden',
                });
            }
        }
        const isExistRouteName = await this.runningRouteRepository.find({
            where: { routeName: routeName },
        });
        if (isExistRouteName.length !== 0) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['Already Existed routeName'],
                error: 'Forbidden',
            });
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const runningRoute = await queryRunner.manager.save(running_route_entity_1.RunningRoute, {
                routeName: routeName,
                startLatitude: arrayOfPos[0].latitude,
                startLongitude: arrayOfPos[0].longitude,
                runningTime: runningTime,
                review: review,
                distance: distance,
                runningDate: runningDate,
                location: location,
                userId: 1,
            });
            if (recommendedTags) {
                try {
                    for (var recommendedTags_1 = __asyncValues(recommendedTags), recommendedTags_1_1; recommendedTags_1_1 = await recommendedTags_1.next(), !recommendedTags_1_1.done;) {
                        const tag = recommendedTags_1_1.value;
                        await queryRunner.manager.insert(route_recommended_tag_entity_1.RouteRecommendedTag, {
                            index: +tag,
                            runningRouteId: runningRoute.id,
                        });
                        const index = await this.redis.zscore(process.env.REDIS_KEY, `recommendedTag:${tag}`);
                        await this.redis.zadd(process.env.REDIS_KEY, +index + 1, `recommendedTag:${tag}`);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (recommendedTags_1_1 && !recommendedTags_1_1.done && (_a = recommendedTags_1.return)) await _a.call(recommendedTags_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (secureTags) {
                try {
                    for (var secureTags_1 = __asyncValues(secureTags), secureTags_1_1; secureTags_1_1 = await secureTags_1.next(), !secureTags_1_1.done;) {
                        const tag = secureTags_1_1.value;
                        await queryRunner.manager.insert(route_secure_tag_entity_1.RouteSecureTag, {
                            index: +tag,
                            runningRouteId: runningRoute.id,
                        });
                        const index = await this.redis.zscore(process.env.REDIS_KEY, `secureTag:${tag}`);
                        await this.redis.zadd(process.env.REDIS_KEY, +index + 1, `secureTag:${tag}`);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (secureTags_1_1 && !secureTags_1_1.done && (_b = secureTags_1.return)) await _b.call(secureTags_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (arrayOfPos.length > 1) {
                const route = arrayOfPos.map((location, idx) => {
                    return this.runningRoutePathRepository.create({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        runningRouteId: runningRoute.id,
                        order: idx,
                    });
                });
                route.shift();
                await queryRunner.manager.insert(running_route_path_entity_1.RunningRoutePath, route);
            }
            if (files && files[0] !== '') {
                files.map((file) => {
                    this.uploadToAws(file).then(async (value) => {
                        await this.imageRepository.save({
                            routeImage: value['url'],
                            key: value['key'],
                            runningRouteId: runningRoute.id,
                        });
                    });
                });
            }
            await queryRunner.commitTransaction();
            return { routeId: runningRoute.id };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    LinestringToArray(data) {
        const linestring = data.toString();
        const temp = linestring.slice(11, -1);
        const points = temp.split(',');
        const arrayOfPos = [];
        points.map((point) => {
            arrayOfPos.push({
                latitude: +point.split(' ')[0],
                longitude: +point.split(' ')[1],
            });
        });
        return arrayOfPos;
    }
    async getById(id) {
        const route = await this.runningRouteRepository.findOne({
            where: { id: id },
            relations: [
                'routeRecommendedTags',
                'routeSecureTags',
                'images',
                'mainRoute',
            ],
        });
        if (!route) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`Route with ID ${id} not found`],
                error: 'NotFound',
            });
        }
        const result = {
            id: route.id,
            routeName: route.routeName,
            runningTime: route.runningTime,
            review: route.review,
            distance: route.distance,
            location: route.location,
            runningDate: route.runningDate,
            recommendedTags: route.routeRecommendedTags.map((tag) => tag.index),
            secureTags: route.routeSecureTags.map((tag) => tag.index),
            files: route.images.map((image) => image.routeImage),
            mainRoute: route.mainRoute ? route.mainRoute.id : null,
        };
        return result;
    }
    async getMainRouteDetail(id) {
        const mainRoute = await this.getById(id);
        if (mainRoute['mainRoute'] !== null) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: ['This route is not mainRoute'],
                error: 'Forbidden',
            });
        }
        const tags = await this.sumTags(id);
        Object.assign(mainRoute, tags);
        const subRoutes = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .where('route.mainRouteId = :id', { id })
            .execute();
        const result = {};
        result['mainRoute'] = mainRoute;
        result['subRoutes'] = await Promise.all(subRoutes.map(async (route) => {
            return await this.getById(route.route_id);
        }));
        return result;
    }
    async update(id, updateRunningRouteDto) {
        const route = await this.runningRouteRepository.findOne({
            where: { id: id },
            relations: ['routeRecommendedTags', 'routeSecureTags', 'images', 'user'],
        });
        if (!route) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`Route with ID ${id} not found`],
                error: 'NotFound',
            });
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.runningRouteRepository.update(id, { updatedAt: new Date() });
            const { review, recommendedTags, secureTags, files } = updateRunningRouteDto;
            if (review) {
                await this.runningRouteRepository.update(id, { review });
            }
            if (recommendedTags) {
                if (route.routeRecommendedTags !== undefined) {
                    route.routeRecommendedTags.map(async (tag) => {
                        await this.routeRecommendedTagRepository.delete({
                            id: tag.id,
                        });
                    });
                }
                recommendedTags.map(async (tag) => {
                    await this.routeRecommendedTagRepository.save({
                        index: +tag,
                        runningRoute: route,
                    });
                });
            }
            if (secureTags) {
                if (route.routeSecureTags !== undefined) {
                    route.routeSecureTags.map(async (tag) => {
                        await this.routeSecureTagRepository.delete({
                            id: tag.id,
                        });
                    });
                }
                secureTags.map(async (tag) => {
                    await this.routeSecureTagRepository.save({
                        index: +tag,
                        runningRoute: route,
                    });
                });
            }
            if (files) {
                if (route.images !== undefined) {
                    route.images.map(async (image) => {
                        this.deleteImageToAws(image.key);
                        await this.imageRepository.delete({
                            id: image.id,
                        });
                    });
                }
                files.map((file) => {
                    this.uploadToAws(file).then(async (value) => {
                        await this.imageRepository.save({
                            routeImage: value['url'],
                            key: value['key'],
                            runningRoute: route,
                        });
                    });
                });
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(id) {
        const route = await this.runningRouteRepository.findOne({
            where: { id: id },
            relations: ['images', 'user'],
        });
        if (!route) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [`Route with ID ${id} not found`],
                error: 'NotFound',
            });
        }
        this.deleteImageToAws(route.key);
        if (route.images !== undefined) {
            route.images.map(async (image) => await this.deleteImageToAws(image.key));
        }
        await this.runningRouteRepository.delete(route.id);
    }
    async checkRunningExperience(id, userId) {
        const route = await this.runningRouteRepository.findOneBy({
            id: id,
        });
        if (!route) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`MainRoute with ID ${id} not exist`],
                error: 'Forbidden',
            });
        }
        const isExist = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .where('route.mainRouteId = :id', { id })
            .andWhere('route.userUserId = :userId', { userId })
            .execute();
        if (isExist.length === 0) {
            return { check: false };
        }
        else {
            return { check: true };
        }
    }
    async getAllMainRoute(userId) {
        const routes = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .where('mainRouteId is null')
            .andWhere('route.userUserId = :userId', { userId })
            .getMany();
        const result = await Promise.all(routes.map(async (route) => {
            return await this.getById(route.id);
        }));
        return result;
    }
    async getAllSubRoute(userId) {
        const routes = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .where('mainRouteId is not null')
            .andWhere('route.userUserId = :userId', { userId })
            .getMany();
        const result = await Promise.all(routes.map(async (route) => {
            return await this.getById(route.id);
        }));
        return result;
    }
    async searchResult(id) {
        const route = await this.runningRouteRepository.findOneBy({ id });
        const result = {
            id: route.id,
            routeName: route.routeName,
            distance: route.distance,
            location: route.location,
        };
        return result;
    }
    async calculateDistance(latitude, longitude) {
        const distance = `6371*acos(cos(radians(${latitude}))*cos(radians(st_x(startpoint)))*cos(radians(st_y(startpoint))-radians(${longitude}))+sin(radians(${latitude}))*sin(radians(st_x(startpoint))))`;
        const routes = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('DISTINCT route.id')
            .addSelect(distance, 'distance')
            .having(`distance <= ${RADIUS}`)
            .where('mainRouteId is null')
            .orderBy('distance', 'ASC')
            .getRawMany();
        return routes;
    }
    async searchBasedOnLocation(locationQueryStringDto) {
        const { latitude, longitude } = locationQueryStringDto;
        const routes = await this.calculateDistance(latitude, longitude);
        const result = await Promise.all(routes.map(async (route) => {
            const tags = await this.sumTags(route.id);
            const searchResult = await this.searchResult(route.id);
            Object.assign(searchResult, tags);
            return searchResult;
        }));
        return result;
    }
    async searchBasedOnCity(cityQueryStringDto) {
        const { city, state } = cityQueryStringDto;
        const routes = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .where('mainRouteId is null')
            .andWhere('route.firstLocation = :city', { city })
            .andWhere('route.secondLocation = :state', { state })
            .getMany();
        const result = await Promise.all(routes.map(async (route) => {
            const tags = await this.sumTags(route.id);
            const searchResult = await this.searchResult(route.id);
            Object.assign(searchResult, tags);
            return searchResult;
        }));
        return result;
    }
    async sumTags(id) {
        const subRouteRecommendedTag = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .addSelect('RouteRecommendedTag.index')
            .leftJoin('route.routeRecommendedTags', 'RouteRecommendedTag')
            .where('route.mainRouteId = :id', { id })
            .execute();
        const subRouteSecureTag = await this.runningRouteRepository
            .createQueryBuilder('route')
            .select('route.id')
            .addSelect('RouteSecureTag.index')
            .leftJoin('route.routeSecureTags', 'RouteSecureTag')
            .where('route.mainRouteId = :id', { id })
            .execute();
        const mainRoute = await this.getById(id);
        const recommendedTags = subRouteRecommendedTag.map((route) => route.RouteRecommendedTag_index);
        const allRecommendedTags = recommendedTags.concat(mainRoute['recommendedTags']);
        const secureTags = subRouteSecureTag.map((route) => route.RouteSecureTag_index);
        const allSecureTags = secureTags.concat(mainRoute['secureTags']);
        const result = { recommendedTags: {}, secureTags: {} };
        for (let i = 1; i <= RECOMMENDEDTAG; i++) {
            const recommendedTagCount = allRecommendedTags.filter((element) => i === element).length;
            result['recommendedTags'][i] = recommendedTagCount;
        }
        for (let i = 1; i <= SECURETAG; i++) {
            const secureTagCount = allSecureTags.filter((element) => i === element).length;
            result['secureTags'][i] = secureTagCount;
        }
        return result;
    }
    async checkRouteName(routeName) {
        try {
            const nameCount = await this.runningRouteRepository.count({
                where: { routeName: (0, typeorm_2.Like)(`${routeName}%`) },
            });
            if (nameCount !== 0) {
                return { result: true, count: nameCount };
            }
            else {
                return { result: false };
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getRecommendedRoute(locationQueryStringDto) {
        const { latitude, longitude } = locationQueryStringDto;
        const routes = await this.calculateDistance(latitude, longitude);
        const result = await Promise.all(routes.map(async (route) => {
            const tags = await this.sumTags(route.id);
            const routeData = await this.getById(route.id);
            const recommendedResult = {
                id: routeData['id'],
                routeName: routeData['routeName'],
                runnigTime: routeData['runningTime'],
                review: routeData['review'],
                distance: routeData['distance'],
                runningDate: routeData['runningDate'],
                routeImage: routeData['routeImage'],
            };
            Object.assign(recommendedResult, tags);
            return recommendedResult;
        }));
        return result;
    }
    async getPopularTags() {
        try {
            const result = await this.redis.zrevrange(process.env.REDIS_KEY, 0, 6);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
};
RunningRouteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __param(2, (0, typeorm_1.InjectRepository)(running_route_entity_1.RunningRoute)),
    __param(3, (0, typeorm_1.InjectRepository)(route_recommended_tag_entity_1.RouteRecommendedTag)),
    __param(4, (0, typeorm_1.InjectRepository)(route_secure_tag_entity_1.RouteSecureTag)),
    __param(5, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(6, (0, typeorm_1.InjectRepository)(running_route_path_entity_1.RunningRoutePath)),
    __metadata("design:paramtypes", [ioredis_1.default,
        typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RunningRouteService);
exports.RunningRouteService = RunningRouteService;
//# sourceMappingURL=running-route.service.js.map