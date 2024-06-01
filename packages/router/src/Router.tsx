import React, { useEffect, useState, useMemo, PropsWithChildren, FC } from "react";

import { RouterContext, RouterContextValue } from "./RouterContext";
import { createHistory, getHashPath, OnNavigateFn } from "./history";
import { createRouteMatcher, RouteMatcherFactory } from "./routeMatcher";
import { getPathWithoutBasename } from "./basename";
import { simpleRouteMatcherFactory } from "./simpleRouteMatcherFactory";

export interface RouterProps {
    basename?: string;
    mode?: "hash" | "path";
    routeMatcherFactory?: RouteMatcherFactory;
    /**
     * An async callback that will be called on a navigation event.
     * If it resolves to false, the navigation event will be aborted
     */
    onNavigate?: OnNavigateFn;
}

export const Router: FC<PropsWithChildren<RouterProps>> = ({
    basename = "",
    mode,
    routeMatcherFactory = simpleRouteMatcherFactory,
    children,
    onNavigate,
}) => {
    const hashMode = mode === "hash";
    const [path, setPath] = useState(() => (hashMode ? getHashPath() : getPathWithoutBasename(basename)));
    const history = useMemo(
        () => createHistory({ hashMode, basename, setPath, onNavigate }),
        [setPath, basename, hashMode, onNavigate],
    );
    const matchRoute = useMemo(() => createRouteMatcher(routeMatcherFactory), [routeMatcherFactory]);
    const router = useMemo<RouterContextValue>(
        () => ({
            basename,
            path,
            history,
            matchRoute,
            urlTo: history.urlTo,
        }),
        [basename, path, history, matchRoute],
    );
    useEffect(() => {
        window.addEventListener("popstate", history.onChange);
        return () => window.removeEventListener("popstate", history.onChange);
    }, [history]);
    return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};
