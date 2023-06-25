import { RunningRoute } from './running-route.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class RouteSecureTag extends TimeAbs {
    id: number;
    index: number;
    runningRouteId: number;
    runningRoute: RunningRoute;
}
