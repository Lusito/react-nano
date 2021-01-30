# @react-nano/router

A simple, lightweight react router using hooks, written in TypeScript.

## Overview

- Flexible and dead simple to use.
- Uses the browsers history API (no bulky polyfill).
- Does not force a matching algorithm on you. It's up to you!
  - Comes with a simple (one-liner) matching algorithm built-in for simple use-cases.
- Written with [hooks](https://reactjs.org/docs/hooks-intro.html) in TypeScript
- Only has one peer dependency: React 16.12.0 or higher.


## Example

A small example might look like this:

```tsx
import { Router } from "@react-nano/router";
export const App = () => (
    <Router>
        <Switch>
            <Route path="/news" component={News} />
            <Route path="/fakenews" component={FakeNews} />
            {/* use "(.*)"  instead of "*" if you use path-to-regexp */}
            <Route path="*" component={Otherwise} />
        </Switch>
    </Router>
);
```
