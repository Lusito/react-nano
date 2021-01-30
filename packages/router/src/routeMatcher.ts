import { RouteParams } from "./Route";

export type CachedRouteMatcher = (pattern: string, path: string) => RouteParams | null;

export type RouteMatcher = (path: string) => RouteParams | null;

export type RouteMatcherFactory = (pattern: string) => RouteMatcher;

export function createRouteMatcher(routeMatcherFactory: RouteMatcherFactory): CachedRouteMatcher {
    const cache: { [s: string]: RouteMatcher } = {};

    return (pattern: string, path: string) => {
        const matcher = cache[pattern] || (cache[pattern] = routeMatcherFactory(pattern));
        return matcher(path);
    };
}
