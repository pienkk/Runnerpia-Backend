import { DataSource, Repository } from 'typeorm';
import { CreateRunningRouteDto } from './dto/create-running-route.dto';
import { RunningRoute } from './entities/running-route.entity';
import { Image } from './entities/image.entity';
import { RouteRecommendedTag } from './entities/route-recommended-tag.entity';
import { RouteSecureTag } from './entities/route-secure-tag.entity';
import { Geometry } from 'wkx';
import { UpdateRunningRouteDto } from './dto/update-running-route.dto';
import { LocationQueryStringDto } from './dto/location-query-string.dto';
import { CityQueryStringDto } from './dto/city-query-string.dto';
import Redis from 'ioredis';
export declare class RunningRouteService {
    private redis;
    private dataSource;
    private runningRouteRepository;
    private routeRecommendedTagRepository;
    private routeSecureTagRepository;
    private imageRepository;
    constructor(redis: Redis, dataSource: DataSource, runningRouteRepository: Repository<RunningRoute>, routeRecommendedTagRepository: Repository<RouteRecommendedTag>, routeSecureTagRepository: Repository<RouteSecureTag>, imageRepository: Repository<Image>);
    uploadToAws(image: string): Promise<object>;
    deleteImageToAws(key: string): Promise<void>;
    create(createRunningRouteDto: CreateRunningRouteDto): Promise<any>;
    LinestringToArray(data: Geometry): Array<object>;
    getById(id: number): Promise<object>;
    getMainRouteDetail(id: number): Promise<{}>;
    update(id: number, updateRunningRouteDto: UpdateRunningRouteDto): Promise<void>;
    delete(id: number): Promise<void>;
    checkRunningExperience(id: number, userId: string): Promise<{
        check: boolean;
    }>;
    getAllMainRoute(userId: string): Promise<object[]>;
    getAllSubRoute(userId: string): Promise<object[]>;
    searchResult(id: number): Promise<object>;
    calculateDistance(latitude: number, longitude: number): Promise<RunningRoute[]>;
    searchBasedOnLocation(locationQueryStringDto: LocationQueryStringDto): Promise<object[]>;
    searchBasedOnCity(cityQueryStringDto: CityQueryStringDto): Promise<object[]>;
    sumTags(id: number): Promise<object>;
    checkRouteName(routeName: string): Promise<{
        result: boolean;
        count: number;
    } | {
        result: boolean;
        count?: undefined;
    }>;
    getRecommendedRoute(locationQueryStringDto: LocationQueryStringDto): Promise<object[]>;
    getPopularTags(): Promise<string[]>;
}
