# Hooks

## `useParams`

In some cases you want to extract parameters without being in a `Route` component.
You can get a memoized parameters object for the given path like this:

```tsx
export const Component = () => {
  const params = useParams<{ id: string }>("/news/:id");
  //...
};
```

## `useRouter`

`Router` internally adds a RouterContext to your application, which you can access using the `useRouter()` hook:

```tsx
import { useRouter } from "@react-nano/router";
...
export function Component() {
    // router is of type RouterContextValue (see below)
    const router = useRouter();
    ....
}
```

`RouterContextValue` is defined as:

```tsx
export interface RouterContextValue {
  basename: string;
  path: string;
  history: RouterHistory;
  matchRoute: CachedRouteMatcher;
  urlTo: (path: string) => string;
}
// with:
export interface RouterHistory {
  push: (path: string) => void;
  replace: (path: string) => void;
  stop: () => void; // for internal use, do not call.
  urlTo: (path: string) => string;
}
// and:
export type CachedRouteMatcher = (pattern: string, path: string) => RouteParams | null;
```

`urlTo()` can be used to create a new url, which respects `basename` and `mode`. It's the same for both `RouterContextValue` and `RouterHistory`.
