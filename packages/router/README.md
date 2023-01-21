# @react-nano/router

[![License](https://flat.badgen.net/github/license/lusito/react-nano?icon=github)](https://github.com/Lusito/react-nano/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/@react-nano/router?icon=dockbit)](https://bundlephobia.com/result?p=@react-nano/router)
[![NPM version](https://flat.badgen.net/npm/v/@react-nano/router?icon=npm)](https://www.npmjs.com/package/@react-nano/router)
[![Stars](https://flat.badgen.net/github/stars/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)

A simple, lightweight react router using hooks, written in TypeScript.

## Why Use @react-nano/router?

- Very lightweight (see the badges above for the latest size).
- Flexible and dead simple to use.
- Uses the browsers history API (no bulky polyfill).
- Does not force a matching algorithm on you. It's up to you!
  - Comes with a simple (one-liner) matching algorithm built-in for simple use-cases.
- Written with [hooks](https://reactjs.org/docs/hooks-intro.html) in TypeScript
- Only has one peer dependency: React 16.12.0 or higher.
- Liberal license: [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE)

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

## How to Use

Check out the [documentation](docs/setup.md)

## Report Issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/react-nano/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

@react-nano has been released under the [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
