import { getPathWithoutBasename } from "./basename";

export type OnNavigateData = {
    from: string;
    to: string;
    type: "push" | "replace";
};
export type OnNavigateFn = (data: OnNavigateData) => Promise<boolean> | boolean;

export interface RouterHistory {
    /** Resolves to false if onNavigate resolved to false */
    push: (path: string) => Promise<boolean>;
    /** Resolves to false if onNavigate resolved to false */
    replace: (path: string) => Promise<boolean>;
    onChange: () => void;
    urlTo: (path: string) => string;
}

export const getHashPath = () => window.location.hash.substr(1);

type CreateHistoryOptions = {
    hashMode: boolean;
    basename: string;
    setPath: (path: string) => void;
    onNavigate?: OnNavigateFn;
};

export function createHistory({ hashMode, basename, setPath, onNavigate }: CreateHistoryOptions): RouterHistory {
    const { location, history } = window;
    const onChange = hashMode ? () => setPath(getHashPath()) : () => setPath(getPathWithoutBasename(basename));

    const urlTo = hashMode
        ? (path: string) => `${location.pathname}${location.search}#${path}`
        : (path: string) => `${basename}${path}`;

    async function historyAction(path: string, type: "push" | "replace") {
        const to = urlTo(path);
        const from = location.pathname + location.search + location.hash;
        // Only push if something changed.
        if (to !== from) {
            if (onNavigate) {
                const allowed = await onNavigate({ from, to, type: "push" });
                if (!allowed) return false;
            }

            if (type === "push") history.pushState({}, "", to);
            else history.replaceState({}, "", to);

            onChange();
        }

        return true;
    }

    return {
        push: (path: string) => historyAction(path, "push"),
        replace: (path: string) => historyAction(path, "replace"),
        onChange,
        urlTo,
    };
}
