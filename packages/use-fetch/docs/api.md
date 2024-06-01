# API

## createFetchHook

- `createFetchHook` creates a type-safe hook that you can use to perform the fetch.
- it takes an object with 3 attributes:
  - `prepare` is a function used to prepare the init object you would pass to a fetch call.
    - the first parameter is the init object you can modify.
    - its (optional) second parameter can be an object of your liking
    - the return value should be the URL you want to run this fetch against.
  - `getResult` is a function called to get the result of a response and also to specify the type of the data. Always add a `as Promise<MyType>` at the end to define your type.
  - `getError` is essentially the same, but for the case where `response.ok === false`. I.e. you can have a different type for non-ok responses.

## Your Custom Hooks

- The hook created by `createFetchHook` gets an optional config parameter with these optional properties:
  - One or more of these callbacks: `onInit`, `onSuccess`, `onError`, `onException`.
    - See [config](./config.md) for more details
  - A parameter `autoSubmit`, which can be used to automatically submit the request on component mount
    - Set this to true if your `prepare` function does not take a data parameter
    - Or set this to the data object your `prepare` function will receive
- `useFetch` returns an array containing 3 items:
  1. The current state of the fetch request, containing the result or error data when it's done. See below for more details.
  2. A submit function, which you can call to manually (re-)submit the request.
  3. An abort function to cancel the active request (it will be automatically called upon unmount).

## FetchState

The first entry of the array returned by your custom hook is a state object. Depending on its `state` property, it can have more properties:

```tsx
// These properties are always available
export interface FetchStateBase {
  /** Request is currently in progress */
  loading: boolean;
  /** Either an exception occurred or the request returned an error */
  failed: boolean;
  /** Request was successful */
  success: boolean;
}

// These are only available when the request has not finished yet
export interface FetchStateEmpty extends FetchStateBase {
  state: "empty";
  failed: false;
  success: false;
}

// These are available in case of success or error
export interface FetchStateDone extends FetchStateBase {
  /** The status code of the response */
  responseStatus: number;
  /** The headers of the response */
  responseHeaders: Headers;
}

// These are available in case of success
export interface FetchStateDoneSuccess<TData> extends FetchStateDone {
  failed: false;
  success: true;
  /** Data is present */
  state: "success";
  /** The response data in case of success */
  data: TData;
}

// These are available in case of an error
export interface FetchStateDoneError<TError extends Record<string, any>> extends FetchStateDone {
  failed: true;
  success: false;
  /** Errors is present */
  state: "error";
  /** The server result data. */
  error: TError;
}

// These are available in case of an exception
export interface FetchStateDoneException extends FetchStateBase {
  failed: true;
  success: false;
  /** Errors is present */
  state: "exception";
  /** The cause of the exception. */
  error: Error;
}

// FetchState can be either of the above:
export type FetchState<TData, TError extends Record<string, any>> =
  | FetchStateEmpty
  | FetchStateDoneSuccess<TData>
  | FetchStateDoneError<TError>
  | FetchStateDoneException;
```

As you can see, you will only be able to access `state.data` if you checked for `state.success` or `state.state === "success"` (or if you ruled out the other possibilities first)
