import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class UserSecureTag extends TimeAbs {
    id: number;
    index: number;
    userId: number;
    user: User;
}
