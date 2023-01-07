# @react-nano/tsrux

[![License](https://flat.badgen.net/github/license/lusito/react-nano?icon=github)](https://github.com/Lusito/react-nano/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/@react-nano/tsrux?icon=dockbit)](https://bundlephobia.com/result?p=@react-nano/tsrux)
[![NPM version](https://flat.badgen.net/npm/v/@react-nano/tsrux?icon=npm)](https://www.npmjs.com/package/@react-nano/tsrux)
[![Stars](https://flat.badgen.net/github/stars/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)

@react-nano/tsrux enables you to reduce the [redux](https://redux.js.org/) boilerplate code you usually write to define your action creators, reducers, etc. and even gain type-safety in the process!

The name stands for type-safe [redux](https://redux.js.org/), aside from the bloody obvious: TypeScript Rocks!

## Why Use @react-nano/tsrux?

- Extremely lightweight: 300 byte vs 7.7 kilobyte for [deox](https://bundlephobia.com/result?p=deox).
- Deadsimple to use
- No dependencies!
- [Fully documented](docs/setup.md)
- Automated unit- and type tests
- Liberal license: [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE)

## Example: Actions Creators

```typescript
// No payload:
export const fetchTodos = actionCreator("TODOS/FETCH");
// With payload:
export const addTodo = actionCreator("TODOS/ADD", (label: string) => ({ label }));
// With payload and metadata:
export const removeTodo = actionCreator(
    "TODOS/REMOVE",
    (id: number) => ({ id }),
    (id: number) => ({ metaId: id, foo: "bar" }),
);

```

[find out more](docs/action-creators.md)

## Example: Reducers

```typescript
export const todosReducer = mapReducers(initialState, (handle) => [
    handle(addTodo, (state, action) => ({
        ...state,
        list: [...state.list, { id: state.nextId, label: action.payload.label, checked: false }],
        nextId: state.nextId + 1,
    })),
    ...
]);
```

[find out more](docs/reducers.md)

## How to Use

Check out the [documentation](docs/setup.md)

## Similar Projects
This package is heavily inspired by [deox](https://github.com/thebrodmann/deox), but uses a more lightweight approach.

Aside from that, there are [redux-actions](https://github.com/redux-utilities/redux-actions) and [typesafe-actions](https://github.com/piotrwitek/typesafe-actions).

## Report Issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/react-nano/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

@react-nano has been released under the [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
