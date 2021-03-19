# Configurations

It's possible to supply configurations both globally (via provider) and locally (as argument to your custom hook).
Both configurations have the same attributes, except that the local config has one additional property `autoSubmit`.

## Local Configuration

Let's take a look at the local configuration first:

```tsx
function UserComponent(props: { id: number }) {
    const [getUser] = useGetUser({
        onInit(init) {
            init.headers.set("Authorization", "...");
        }
        onSuccess(context) {
            console.log('success', context.data, context.status, context.responseHeaders);
        },
        onError(context) {
            console.log('error', context.error, context.status, context.responseHeaders);
        },
        onException(context) {
            console.log('exception', context.error);
        },
        autoSubmit: { id: data.id },
    });
    // ...
}
```

- All of the properties are optional.
- Specify `autoSubmit` if you want to send the request on component mount without having to call its submit function manually.
  - Set this to true if your `prepare` function does not take a data parameter
  - Or set this to the data object your `prepare` function will receive
- Specify callbacks for certain events instead of watching the state object in a useEffect Hook.
  - The hook will always use the latest version of the callbacks.
  - If the component making the request has been unmounted, the callbacks will not be called.

### Callback Context

The context parameter has different properties depending on the callback:

```TypeScript
export interface CallbackContext<TVars> {
    /** The data you used to submit the request */
    inputData: TVars;
}

export interface CallbackContextWithResponse<TVars> extends CallbackContext<TVars> {
    /** The status code of the request */
    status: number;
    /** The response headers headers of the request */
    responseHeaders: Headers;
}

export interface OnSuccessContext<TVars, TData> extends CallbackContextWithResponse<TVars> {
    /** The result of the fetch */
    data: TData;
}

export interface OnErrorContext<TVars, TError> extends CallbackContextWithResponse<TVars> {
    /** The error data the server returned for the fetch */
    error: TError;
}

export interface OnExceptionContext<TVars> extends CallbackContext<TVars> {
    /** The error that was thrown. */
    error: Error;
}
```

## Global Configuration

You can specify a global configuration by wrapping your app content in a provider:

```tsx
function MyApp {
    return (
        <FetchGlobalConfigProvider value={{
            onInit(init) {
                init.headers.set("authorization", token);
            },
            onException(error) {
                console.log("Exception during fetch request", error);
            },
            ...
        }}>
            ...The app content
        </FetchGlobalConfigProvider>
    );
}
```

As said, the only difference between local and global configurations is the autoSubmit property in local configurations.

- Callbacks will run both globally and locally.
  - Keep in mind, that some of the types are different for each hook, so you'll have to manually cast the data if you need access to it.
  - Most common scenarios for using the callbacks globally:
    - Adding authorization headers to the request
    - Logging and/or showing toast messages on success/error/exception events
  - Just as with local callbacks: If the component making the request has been unmounted, the callbacks will not be called.
