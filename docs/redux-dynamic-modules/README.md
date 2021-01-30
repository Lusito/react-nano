# @react-nano/redux-dynamic-modules

Making [redux-dynamic-modules](https://github.com/microsoft/redux-dynamic-modules) more lightweight by using `@react-nano/redux` instead of `react-redux`.
Written in TypeScript.

## Overview

- It still uses redux-dynamic-modules(-core) under the hood (as a peer dependency), so you'll stay up to date with the latest features and bugfixes!
- All it does is supply a different `DynamicModuleLoader` component which leverages the power of hooks in combination with `@react-nano/redux`.
- All other imports can be taken from `redux-dynamic-modules-core` instead of `redux-dynamic-modules`.
- Only has four peer dependencies:
  - React 16.8.0 or higher
  - Redux 4.0.0 or higher
  - @react-nano/redux in the same version
  - redux-dynamic-modules-core 5.0.0 or higher

Note: Since this library uses `@react-nano/redux`, your code also needs to be using `@react-nano/redux` (otherwise you'd be using `redux-dynamic-modules`).

## Setup

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

## Install via NPM or YARN

<code-group>
<code-block title="NPM" active>
```bash
npm i @react-nano/redux-dynamic-modules
```
</code-block>

<code-block title="YARN">
```bash
yarn add @react-nano/redux-dynamic-modules
```
</code-block>
</code-group>

## DynamicModuleLoader

It works just like the original. You only need to adjust the import statement:

```tsx
import { DynamicModuleLoader } from "@react-nano/redux-dynamic-modules";
export const MyComponent = () => (
    <DynamicModuleLoader modules={[myModule()]}>
        ....
    </DynamicModuleLoader>
);
```
