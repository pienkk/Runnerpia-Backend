import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class Bookmark extends TimeAbs {
    id: number;
    userIdx: number;
    runningRouteId: number;
    user: User;
    runningRoute: RunningRoute;
}
