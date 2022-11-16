# Setup

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

## Install via NPM

```bash
npm i @react-nano/redux-dynamic-modules
```

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
