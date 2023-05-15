import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { DeleteBookmarkDto } from './dto/delete-bookmark.dto';
import { ResponseCreateUserDto } from './dto/response-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ResponseCreateUserDto>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<any>;
    remove(req: any): Promise<void>;
    getBookmarks(req: any): Promise<any>;
    createBookmark(createBookmarkDto: CreateBookmarkDto, req: any): Promise<any>;
    deleteBookmark(deleteBookmarkDto: DeleteBookmarkDto, req: any): Promise<void>;
    getUseRecommended(req: any): Promise<any>;
    increaseUseRecommended(req: any): Promise<void>;
    checkId(id: string): Promise<void>;
    checkNickname(nickname: string): Promise<void>;
}
