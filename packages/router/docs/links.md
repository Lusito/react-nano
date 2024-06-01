# Links, etc.

## Link

The `Link` component can be used to change the url and still act as a normal `<a>` tag, so you can open the link in a new tab.

```tsx
export const Component = () => <Link href="/hello">Test</Link>;
```

Any extra props you pass in will be forwarded to the `<a>` element. If you specify an `onClick` property and it calls `preventDefault()`, then the history change will not happen, as would be the case with any normal link.

## LinkButton, Etc.

If you want to create a LinkButton or similar, you can do that easily. This is the implementation of Link:

```tsx
export function Link(props: React.PropsWithChildren<LinkProps>) {
  const routeLink = useRouteLink(props.href, props.onClick);
  return <a {...props} href={routeLink.href} onClick={routeLink.onClick} />;
}
```

Creating a `LinkButton` is as simple as this:

```tsx
import { useRouteLink } from "@react-nano/router";
...
export function LinkButton(props: React.PropsWithChildren<LinkButtonProps>) {
    const routeLink = useRouteLink(props.href, props.onClick);
    return <button {...props} onClick={routeLink.onClick} />;
}
```
