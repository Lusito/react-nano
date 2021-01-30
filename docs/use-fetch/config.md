# Configurations

It's possible to supply configurations both globally (via provider) and locally (as argument to your custom hook).
Both configurations have the same attributes, except that the local config has one additional property `autoSubmit`.

## Local Configuration

Let's take a look at the local configuration first:

```tsx
function UserComponent(props: { id: number }) {
    const [getUser] = useGetUser({
        onInit(init: FetchRequestInit) {
            init.headers.set("Authorization", "...");
        }
        onSuccess(result: UserDTO, status: number, responseHeaders: Headers) {
            console.log('success', result, status, responseHeaders);
        },
        onError(errorResult: RestValidationErrorDTO, status: number, responseHeaders: Headers) {
            console.log('error', errorResult, status, responseHeaders);
        },
        onException(error: Error) {
            console.log('exception', error);
        },
        autoSubmit: { id: data.id },
    });
    // ...
}
```

- All of the properties are optional.
- You don't need to specify the parameter types (the hook knows them). I only wrote them down for clarity.
- Specify `autoSubmit` if you want to send the request without having to call its submit function manually.
  - Set this to true if your `prepare` function does not take a data parameter
  - Or set this to the data object your `prepare` function will receive
- Specify callbacks for certain events instead of watching the state object in a useEffect Hook.
  - The hook will always use the latest version of the callbacks.
  - If the component making the request has been unmounted, the callbacks will not be called.

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