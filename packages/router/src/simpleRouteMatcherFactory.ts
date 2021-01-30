export function simpleRouteMatcherFactory(pattern: string) {
    return (path: string) => (path === pattern || pattern === "*" ? {} : null);
}
