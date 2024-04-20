export type RouteBuilderFunction = (params?: Record<string, string | number> | null, query?: Record<string, string | number>) => string;
export declare const buildRoutes: <T extends string>(rootUrl: string, routeObj: Record<T, string>) => Record<T, RouteBuilderFunction>;
