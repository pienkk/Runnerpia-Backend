import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { User } from './user.entity';
export declare class Like {
    id: number;
    createdAt: Date;
    user: User;
    runningRoute: RunningRoute;
}
