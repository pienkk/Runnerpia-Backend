import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class Like extends TimeAbs {
    id: number;
    userId: number;
    runningRouteId: number;
    user: User;
    runningRoute: RunningRoute;
}
