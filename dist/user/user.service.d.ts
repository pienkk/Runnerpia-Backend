import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRecommendedTag } from './entities/user-recommended-tag.entity';
import { UserSecureTag } from './entities/user-secure-tag.entity';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { RunningRoute } from '../running-route/entities/running-route.entity';
import { DeleteBookmarkDto } from './dto/delete-bookmark.dto';
export declare class UserService {
    private userRepository;
    private userRecommendedTagRepository;
    private userSecureTagRepository;
    private bookmarkRepository;
    private runningRouteRepository;
    constructor(userRepository: Repository<User>, userRecommendedTagRepository: Repository<UserRecommendedTag>, userSecureTagRepository: Repository<UserSecureTag>, bookmarkRepository: Repository<Bookmark>, runningRouteRepository: Repository<RunningRoute>);
    updateTagsInfo(userDto: UpdateUserDto): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<any>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<void>;
    remove(userId: string): Promise<void>;
    getBookmarks(userId: string): Promise<any>;
    createBookmark(createBookmarkDto: CreateBookmarkDto, userId: string): Promise<any>;
    deleteBookmark(deleteBookmarkDto: DeleteBookmarkDto, userId: string): Promise<void>;
    getUseRecommended(userId: string): Promise<any>;
    increaseUseRecommended(userId: string): Promise<void>;
    checkId(userId: string): Promise<void>;
    checkNickname(nickname: string): Promise<void>;
}
