import { CityQueryStringDto } from './dto/city-query-string.dto';
import { CreateRunningRouteDto } from './dto/create-running-route.dto';
import { LocationQueryStringDto } from './dto/location-query-string.dto';
import { UpdateRunningRouteDto } from './dto/update-running-route.dto';
import { RunningRouteService } from './running-route.service';
export declare class RunningRouteController {
    private readonly runningRouteService;
    constructor(runningRouteService: RunningRouteService);
    create(createRunningRouteDto: CreateRunningRouteDto): Promise<any>;
    getPopularTags(): Promise<string[]>;
    searchBasedOnLocation(searchQueryStringDto: LocationQueryStringDto): Promise<object[]>;
    searchBasedOnCity(cityQueryStringDto: CityQueryStringDto): Promise<object[]>;
    getAllSubRoute(req: any): Promise<object[]>;
    getAllMainRoute(req: any): Promise<object[]>;
    checkRunningExperience(id: number, req: any): Promise<{
        check: boolean;
    }>;
    getMainRouteDetail(id: number): Promise<{}>;
    getById(id: number): Promise<object>;
    checkRouteName(routeName: string): Promise<{
        result: boolean;
        count: number;
    } | {
        result: boolean;
        count?: undefined;
    }>;
    getRecommendedRoute(locationQueryStringDto: LocationQueryStringDto): Promise<object[]>;
    update(id: number, updateRunningRouteDto: UpdateRunningRouteDto): Promise<void>;
    delete(id: number): Promise<void>;
}
