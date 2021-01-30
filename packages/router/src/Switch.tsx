import React, { isValidElement } from "react";

import { RouteProps } from "./Route";
import { useRouter } from "./hooks";

export interface SwitchProps {
    children: Array<React.ReactElement<RouteProps>>;
}

export function Switch(props: SwitchProps) {
    const { matchRoute, path } = useRouter();

    return (
        props.children.find((child) => child && isValidElement(child) && !!matchRoute(child.props.path, path)) ?? null
    );
}
