# Configurations

It's possible to supply configurations both globally (via provider) and locally (as argument to your query/mutation hook).
Both configurations have the same attributes, except that the local config has one additional property `autoSubmit`.

## Local Configuration

Let's take a look at the local configuration first:

```TypeScript
export interface GraphQLConfig<TData, TError extends Record<string, any>> {
    /** The url to use. Defaults to "/graphql" if neither global nor local config specifies it */
    url?: string;

    /**
     * Called right before a request will be made. Use it to extend the request with additional information like authorization headers.
     *
     * @param init The request data to be send.
     */
    onInit?(init: RequestInit & GraphQLRequestInit): void;

    /**
     * Called on successful request with the result
     *
     * @param data The result of the query/mutation
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onSuccess?(data: TData, status: number, responseHeaders: Headers): void;

    /**
     * Called on server error
     *
     * @param errors The errors the server returned for the query/mutation
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onError?(errors: TError[], status: number, responseHeaders: Headers): void;

    /**
     * Called when an exception happened in the frontend
     *
     * @param error The error that was thrown.
     */
    onException?(error: Error): void;
}

export interface GraphQLLocalConfig<TData, TError extends Record<string, any>, TVars extends VariableType>
    extends GraphQLConfig<TData, TError> {
    /** Specify to cause the request to be submitted automatically */
    autoSubmit?: TVars extends null ? true : TVars;
}
```

- All of the properties are optional.
- Specify `autoSubmit` if you want to send the request without having to call its submit function manually.
  - The value is expected to be `true` for requests without variables and a variable object otherwise.
- Specify callbacks for certain events instead of watching the state object in a useEffect Hook.
  - The hook will always use the latest version of the callbacks.
  - If the component making the request has been unmounted, the callbacks will not be called.
- Take a look at the [hook description](hook.md) hook to see how to specify this config.

## Global Configuration

You can specify a global configuration by wrapping your app content in a provider:

```tsx
function MyApp {
    return (
        <GraphQLGlobalConfigProvider value={{
            onInit(init) {
                init.headers.set("authorization", token);
            },
            onException(error) {
                console.log("Exception during GraphQL request", error);
            },
            ...
        }}>
            ...The app content
        </GraphQLGlobalConfigProvider>
    );
}
```

As said, the only difference between local and global configurations is the autoSubmit property in local configurations.

- This means, that you can specify the url globally, but you can override it locally if you need to.
- Callbacks on the other hand will run both globally and locally.
  - Keep in mind, that some of the types are different for each query/mutation, so you'll have to manually cast the data if you need access to it.
  - Most common scenarios for using the callbacks globally:
    - Adding authorization headers to the request
    - Logging and/or showing toast messages on success/error/exception events
  - Just as with local callbacks: If the component making the request has been unmounted, the callbacks will not be called.
