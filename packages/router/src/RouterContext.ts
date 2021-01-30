import { createContext } from "react";

import { RouterHistory } from "./history";
import type { CachedRouteMatcher } from "./routeMatcher";

export interface RouterContextValue {
    basename: string;
    path: string;
    history: RouterHistory;
    matchRoute: CachedRouteMatcher;
    urlTo: (path: string) => string;
}

const throwMissingDefault = () => {
    throw new Error("You forgot to add a Router element to your app.");
};

export const RouterContext = createContext<RouterContextValue>({
    basename: "",
    path: "",
    history: {
        push: throwMissingDefault,
        replace: throwMissingDefault,
        stop: throwMissingDefault,
        urlTo: throwMissingDefault,
    },
    matchRoute: throwMissingDefault,
    urlTo: throwMissingDefault,
});
