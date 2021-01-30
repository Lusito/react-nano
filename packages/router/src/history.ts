import { getPathWithoutBasename } from "./basename";

export interface RouterHistory {
    push: (path: string) => void;
    replace: (path: string) => void;
    stop: () => void;
    urlTo: (path: string) => string;
}

export const getHashPath = () => window.location.hash.substr(1);

export function createHistory(hashMode: boolean, basename: string, setPath: (path: string) => void): RouterHistory {
    const { location, history } = window;
    const onChange = hashMode ? () => setPath(getHashPath()) : () => setPath(getPathWithoutBasename(basename));

    const urlTo = hashMode
        ? (path: string) => `${location.pathname}${location.search}#${path}`
        : (path: string) => `${basename}${path}`;

    window.addEventListener("popstate", onChange);
    return {
        push(path: string) {
            const newPath = urlTo(path);
            // Only push if something changed.
            if (newPath !== location.pathname + location.search + location.hash) history.pushState({}, "", newPath);
            onChange();
        },
        replace(path: string) {
            history.replaceState({}, "", urlTo(path));
            onChange();
        },
        stop() {
            window.removeEventListener("popstate", onChange);
        },
        urlTo,
    };
}
