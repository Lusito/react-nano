import React, { useEffect, useState, useMemo } from "react";

import { RouterContext, RouterContextValue } from "./RouterContext";
import { createHistory, getHashPath } from "./history";
import { createRouteMatcher, RouteMatcherFactory } from "./routeMatcher";
import { getPathWithoutBasename } from "./basename";
import { simpleRouteMatcherFactory } from "./simpleRouteMatcherFactory";

export interface RouterProps {
    basename?: string;
    mode?: "hash" | "path";
    routeMatcherFactory?: RouteMatcherFactory;
}

export const Router = ({
    basename = "",
    mode,
    routeMatcherFactory = simpleRouteMatcherFactory,
    children,
}: React.PropsWithChildren<RouterProps>) => {
    const hashMode = mode === "hash";
    const [path, setPath] = useState(() => (hashMode ? getHashPath() : getPathWithoutBasename(basename)));
    const history = useMemo(() => createHistory(hashMode, basename, setPath), [setPath, basename, hashMode]);
    const matchRoute = useMemo(() => createRouteMatcher(routeMatcherFactory), [routeMatcherFactory]);
    const router = useMemo<RouterContextValue>(
        () => ({
            basename,
            path,
            history,
            matchRoute,
            urlTo: history.urlTo,
        }),
        [basename, path, history, matchRoute]
    );
    useEffect(() => history.stop, [history]);
    return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};
