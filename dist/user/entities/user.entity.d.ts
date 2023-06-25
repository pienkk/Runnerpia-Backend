import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { Bookmark } from './bookmark.entity';
import { Like } from './like.entity';
import { UserRecommendedTag } from './user-recommended-tag.entity';
import { UserSecureTag } from './user-secure-tag.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
export declare class User extends TimeAbs {
    id: number;
    name: string;
    nickname: string;
    userId: string;
    password: string;
    numberOfUse: number;
    birthDate: number;
    gender: 'F' | 'M';
    city: string;
    state: string;
    currentHashedRefreshToken?: string;
    runningRoutes: RunningRoute[];
    bookmarks: Bookmark[];
    likes: Like[];
    userRecommendedTags: UserRecommendedTag[];
    userSecureTags: UserSecureTag[];
}
