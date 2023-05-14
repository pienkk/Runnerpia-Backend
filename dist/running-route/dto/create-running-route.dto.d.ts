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
    readonly firstLocation: string;
    readonly secondLocation: string;
    readonly thirdLocation: string;
    readonly runningDate: Date;
    readonly routeImage: string;
    readonly recommendedTags: string[];
    readonly secureTags: string[];
    readonly files: string[];
    readonly mainRoute: number;
}
export {};
