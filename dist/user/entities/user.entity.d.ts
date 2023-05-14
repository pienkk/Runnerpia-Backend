import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { Bookmark } from './bookmark.entity';
import { Like } from './like.entity';
import { UserRecommendedTag } from './user-recommended-tag.entity';
import { UserSecureTag } from './user-secure-tag.entity';
export declare class User {
    name: string;
    nickname: string;
    userId: string;
    password: string;
    numberOfUse: number;
    birthDate: number;
    gender: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    currentHashedRefreshToken?: string;
    runningRoutes: RunningRoute[];
    bookmarks: Bookmark[];
    likes: Like[];
    userRecommendedTags: UserRecommendedTag[];
    userSecureTags: UserSecureTag[];
}
