---
title: redux-dynamic-modules
description: Making redux-dynamic-modules more lightweight by using @react-nano/redux instead of react-redux.
keywords:
  - react
  - redux
  - redux-dynamic-modules
sidebar:
  - 'setup'
---

# @react-nano/redux-dynamic-modules

[![License](https://flat.badgen.net/github/license/lusito/react-nano?icon=github)](https://github.com/Lusito/react-nano/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/@react-nano/redux-dynamic-modules?icon=dockbit)](https://bundlephobia.com/result?p=@react-nano/redux-dynamic-modules)
[![NPM version](https://flat.badgen.net/npm/v/@react-nano/redux-dynamic-modules?icon=npm)](https://www.npmjs.com/package/@react-nano/redux-dynamic-modules)
[![Stars](https://flat.badgen.net/github/stars/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)

Making [redux-dynamic-modules](https://github.com/microsoft/redux-dynamic-modules) more lightweight by using `@react-nano/redux` instead of `react-redux`.
Written in TypeScript.

## Why Use @react-nano/redux-dynamic-modules?

- Very lightweight (see the badges above for the latest size).
- It still uses redux-dynamic-modules(-core) under the hood (as a peer dependency), so you'll stay up to date with the latest features and bugfixes!
- All it does is supply a different `DynamicModuleLoader` component which leverages the power of hooks in combination with `@react-nano/redux`.
- All other imports can be taken from `redux-dynamic-modules-core` instead of `redux-dynamic-modules`.
- Only has four peer dependencies:
  - React 16.8.0 or higher
  - Redux 4.0.0 or higher
  - @react-nano/redux in the same version
  - redux-dynamic-modules-core 5.0.0 or higher
- Liberal license: [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE)

Note: Since this library uses `@react-nano/redux`, your code also needs to be using `@react-nano/redux` (otherwise you'd be using `redux-dynamic-modules`).

## How to Use

Check out the [documentation](docs/setup.md)

## Report Issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/react-nano/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

@react-nano has been released under the [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
