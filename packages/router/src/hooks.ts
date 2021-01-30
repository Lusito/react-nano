import { useContext, useMemo } from "react";

import { RouterContext } from "./RouterContext";
import type { RouteParams } from "./Route";

export const useRouter = () => useContext(RouterContext);

export function useParams<T extends RouteParams = RouteParams>(path: string): T {
    const router = useRouter();
    return useMemo(() => router.matchRoute(path, router.path), [path, router]) as T;
}
