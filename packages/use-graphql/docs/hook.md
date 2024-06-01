# Your GraphQL Hook

## Using the Hook

The hook you build using [the hook builder](./builder.md) allows you to perform a GraphQL request from within a react component.

It takes an optional [config](config.md) object and returns a tuple with 3 elements:

- A state object containing information about the request and possibly the results or errors
- A submit function if you want to run the request manually
- An abort function if you want to abort the request manually (it will be aborted automatically when the component gets unmounted).

All of this completely type-safe!

### Example

```tsx
import { graphQL } from "@react-nano/use-graphql";

// See the examples in the "Hook Builder" section.
const useUserQuery = graphQL.query("user")...;

export function UserSummary({ id }: UserSummaryProps) {
    const [userState] = useUserQuery({ url: "/graphql", autoSubmit: { id } });

    if (!userState.success) return <div>Loading</div>;

    const user = userState.data;
    return (
        <ul>
            <li>Name: {user.name}</li>
            <li>Icon: <img src={user.icon} alt="User Icon" /></li>
            <li>Posts:
                <ul>
                    {user.posts.map((post) => (
                        <li key={post.id}>{post.title} with {post.hits} hits</li>
                    ))}
                </ul>
            </li>
        </ul>
    );
}
```

## The State Object

The state object always has these properties:

- `loading: boolean` => Request is currently in progress
- `failed: boolean;` => Either an exception occurred or the request returned an error
- `success: boolean;` => Request was successful
- `type: "empty" | "success" | "error" | "exception"` => The last known state of the request (a new request might be in progress)

Depending on `type`, additional properties might be available:

- `"empty"` => This is the initial state if no request has returned yet
  - `failed` will always be `false`
  - `success` will always be `false`
- `"success` => This is the state when a request returned successful.
  - `failed` will always be `false`
  - `success` will always be `true`
  - `responseStatus: number;` => The status code of the response
  - `responseHeaders: Headers;` => The headers of the response
  - `data: ResultType` => The server result
- `"error"` => The server responded with an error.
  - `failed` will always be `true`
  - `success` will always be `false`
  - `responseStatus: number;` => The status code of the response
  - `responseHeaders: Headers;` => The headers of the response
  - `errors: ErrorType[];` => The list of errors returned by the server
- `"exception"` => An exception has been thrown in JavaScript
  - `failed` will always be `true`
  - `success` will always be `false`
  - `errors: Error;` => The error that has been thrown

## The Submit Function

The submit function arguments depend on wether you defined variables in your hook:

- If you defined variables, you'll need to pass them as an object to the submit function.
  - E.g. `submit({ id: "hello" });`
- Otherwise, call the submit function without arguments.

## The Abort Function

This function is simple. It takes no arguments and stops the request.
