import React, { FC, isValidElement } from "react";

import { RouteProps } from "./Route";
import { useRouter } from "./hooks";

export interface SwitchProps {
    children: Array<React.ReactElement<RouteProps>>;
}

export const Switch: FC<SwitchProps> = (props: SwitchProps) => {
    const { matchRoute, path } = useRouter();

    return (
        props.children.find((child) => child && isValidElement(child) && !!matchRoute(child.props.path, path)) ?? null
    );
};
