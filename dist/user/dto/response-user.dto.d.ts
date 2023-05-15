import { User } from '../entities/user.entity';
export declare class ResponseCreateUserDto {
    name: string;
    nickname: string;
    userId: string;
    numberOfUse: number;
    birthDate: number;
    gender: 'F' | 'M';
    city: string;
    state: string;
    static fromEntity(entity: User): ResponseCreateUserDto;
}
