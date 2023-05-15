export declare class CreateUserDto {
    readonly name: string;
    readonly nickname: string;
    readonly userId: string;
    password: string;
    readonly birthDate: number;
    readonly gender: 'F' | 'M';
    readonly city: string;
    readonly state: string;
    readonly recommendedTags: number[];
    readonly secureTags: number[];
}
