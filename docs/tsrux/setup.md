# Setup

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

## Install via NPM or YARN

<code-group>
<code-block title="NPM" active>
```bash
npm i @react-nano/tsrux
```
</code-block>

<code-block title="YARN">
```bash
yarn add @react-nano/tsrux
```
</code-block>
</code-group>

## Redux

You will need [redux](https://redux.js.org) to use @react-nano/tsrux, but since you got here, you most likely already use redux.

Actually, you don't need redux specifically, since @react-nano/tsrux has no dependency on redux. You could use any other library that uses the same API for actions and reducers!
