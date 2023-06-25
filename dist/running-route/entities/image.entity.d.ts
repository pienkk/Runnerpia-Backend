import { RunningRoute } from './running-route.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class Image extends TimeAbs {
    id: number;
    routeImage: string;
    key: string;
    runningRouteId: number;
    runningRoute: RunningRoute;
}
