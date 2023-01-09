import React, { FC, useMemo } from "react";

import { useRouter } from "./hooks";

export type RouteParams = { [s: string]: string | undefined };

export interface RouteComponentProps<T extends RouteParams = any> {
    params: T;
}

export interface RouteProps {
    children?: ((params: RouteParams) => React.ReactNode) | React.ReactNode;
    path: string;
    component?: React.ComponentType<RouteComponentProps>;
    addKey?: boolean | string[];
}

export const Route: FC<RouteProps> = (props) => {
    const router = useRouter();
    const params = useMemo(() => router.matchRoute(props.path, router.path), [props.path, router]);

    if (!params) return null;

    const Component = props.component;
    if (Component) {
        let key: string | undefined;
        if (props.addKey === true) key = router.path;
        else if (props.addKey) key = props.addKey.map((k) => `${k}=${params[k]}`).join("|");
        return <Component params={params} key={key} />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{typeof props.children === "function" ? props.children(params) : props.children}</>;
};
