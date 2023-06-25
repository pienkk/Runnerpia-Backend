import { TimeAbs } from 'src/common/entities/TimeAbs';
import { RunningRoute } from './running-route.entity';
export declare class RunningRoutePath extends TimeAbs {
    id: number;
    latitude: string;
    longitude: string;
    order: number;
    runningRouteId: number;
    runningRoute: RunningRoute;
}
