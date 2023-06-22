declare type eachPoint = {
    latitude: string;
    longitude: string;
};
export declare class CreateRunningRouteDto {
    readonly routeName: string;
    readonly arrayOfPos: eachPoint[];
    readonly runningTime: string;
    readonly distance: string;
    readonly review: string;
    readonly location: string;
    readonly runningDate: Date;
    readonly recommendedTags: string[];
    readonly secureTags: string[];
    readonly files: string[];
    readonly mainRoute: number;
}
export {};
