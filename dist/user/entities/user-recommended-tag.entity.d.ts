import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class UserRecommendedTag extends TimeAbs {
    id: number;
    index: number;
    userIdx: number;
    user: User;
}
