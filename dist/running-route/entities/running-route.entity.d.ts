import { Geometry } from 'wkx';
import { User } from '../../user/entities/user.entity';
import { Bookmark } from '../../user/entities/bookmark.entity';
import { Like } from '../../user/entities/like.entity';
import { RouteRecommendedTag } from './route-recommended-tag.entity';
import { RouteSecureTag } from './route-secure-tag.entity';
import { Image } from './image.entity';
export declare class RunningRoute {
    id: number;
    routeName: string;
    startPoint: Geometry;
    arrayOfPos: Geometry;
    runningTime: string;
    review: string;
    distance: number;
    runningDate: Date;
    key: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    bookmarks: Bookmark[];
    likes: Like[];
    routeRecommendedTags: RouteRecommendedTag[];
    routeSecureTags: RouteSecureTag[];
    images: Image[];
    mainRoute: RunningRoute;
    subRoute: RunningRoute[];
}