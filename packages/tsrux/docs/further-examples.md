# Further Examples

## Configure Store

You might be used to a `configureStore` function from libraries like `deox`. @react-nano/tsrux does not provide one for a good reason:
There are already projects out there providing these. Depending on your other libraries you might already have one.

Here are some references:

- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) (formerly known as [redux-starter-kit](https://www.npmjs.com/package/redux-starter-kit))
- [redux-dynamic-modules](https://www.npmjs.com/package/redux-dynamic-modules), an awesome library if you are planning to modularize your code.

## Combine Reducers

@react-nano/tsrux is compatible with [combineReducers](https://redux.js.org/api/combinereducers) from redux.

## Create Store

@react-nano/tsrux is compatible with [createStore](https://redux.js.org/api/createstore) from redux.

## Redux Saga

@react-nano/tsrux is compatible with [redux-saga](https://redux-saga.js.org/) and reduces boilerplate code here as well:

```typescript
import { ActionOf } from "@react-nano/tsrux";
import { addTodo } from "./actions";

function* todosSaga() {
  yield takeEvery(addTodo.type, addTodoSaga);
}

function* addTodoSaga(action: ActionOf<typeof addTodo>) {
  //...
}
```

## Redux Thunk

No special knowledge required to use redux thunk with @react-nano/tsrux.
