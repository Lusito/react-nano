import React, { useMemo } from "react";

import { useRouter } from "./hooks";

export function useRouteLink(href: string, onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>) {
    const { history } = useRouter();

    return useMemo(
        () => ({
            onClick(e: React.MouseEvent<HTMLElement>) {
                try {
                    onClick?.(e);
                } catch (error) {
                    console.error(error);
                }
                if (!e.defaultPrevented) {
                    e.preventDefault();
                    history.push(href);
                }
            },
            href: history.urlTo(href),
        }),
        [href, onClick, history]
    );
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
    const routeLink = useRouteLink(props.href, props.onClick);
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} href={routeLink.href} onClick={routeLink.onClick} />;
}
