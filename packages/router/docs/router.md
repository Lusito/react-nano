# Router

You'll need to add a `Router` component in your app (just one). Any other components and hooks from this library need to be children of this `Router` (doesn't matter how deeply nested).

```tsx
import { Router } from "@react-nano/router";
export const App = () => (
    <Router>
        ....
    </Router>
);
```

## Storing the Route in the Hash
In some situations, it's easier to store the route in the hash part of the URL, as it avoids the server having to be aware of the single page application behavior. You can enable the "hash" mode on the `Router` component:

```tsx
import { Router } from "@react-nano/router";
export const App = () => (
    <Router mode="hash">
        ....
    </Router>
);
```

This will result in a url like `https://some-domain.com/#/News` instead of `https://some-domain.com/News`.

This approach will still use the [history](https://caniuse.com/history) API internally!

## Using a Basename
If your app is not located at the root directory of a server, but instead in a sub-directory, you'll want to specify that sub-directory. Basename will then automatically be prefixed on [Link](./links.md) components.

```tsx
import { Router } from "@react-nano/router";
export const App = () => (
    <Router basename="/my-app">
        ....
    </Router>
);
```

If you have a `<base>` tag in your HTML, this can be easily detected using the `getBasename()` helper. That way you don't have to hard-code it:

```tsx
import { Router, getBasename } from "@react-nano/router";
export const App = () => (
    <Router basename={getBasename()}>
        ....
    </Router>
);
```

## Custom Route Matching
This library doesn't force a route matching algorithm on you, but it comes with a lightweight one built-in.
The built-in route matching algorithm only allows exact matches and a "match everything" ("*") though.

If you need something more sophisticated, you'll have to supply a factory. Here is a simple example using the popular [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) library:

```tsx
import { pathToRegexp, Key } from "path-to-regexp";
import { Router, RouteParams } from "@react-nano/router";

function routeMatcherFactory(pattern: string) {
    const keys: Key[] = [];
    const regex = pathToRegexp(pattern, keys);

    return (path: string) => {
        const out = regex.exec(path);

        if (!out) return null;

        return keys.reduce((params, key, i) => {
            params[key.name] = out[i + 1];
            return params;
        }, {} as RouteParams);
    }
}

export const App = () => (
    <Router routeMatcherFactory={routeMatcherFactory}>
        ....
    </Router>
);
```

Using pathToRegexp allows to extract named parameters from a pattern like "/users/:name".
I.e. if the path is "/users/Zaphod", then the param with the key "name" would have the value "Zaphod".
