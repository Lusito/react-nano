# Example: Request Data

## Creating a Custom Fetch Hook

Let's say you have a user object you want to fetch. First you'll create a custom hook to perform the fetch:

```tsx
import { createFetchHook, prepareGet } from "@react-nano/use-fetch";

export const useGetUser = createFetchHook({
    prepare: (init: FetchRequestInit, data: { id: number }) => {
        prepareGet(init);
        return `api/user${data.id}`
    },
    getResult: (response: Response) => response.json() as Promise<UserDTO>,
    getError: (response: Response) => response.json() as Promise<RestValidationErrorDTO>
});
```

- `createFetchHook` creates a hook for you. See further below for more details.
- `prepareGet` is a helper to prepare the init object for a GET request. See further below for more details.


## Using the Custom Fetch Hook

Now you can start using your new `useGetUser` hook:

```tsx
import { useGetUser } from "./fetch/user";

function UserComponent(props: { id: number }) {
    const [getUser] = useGetUser({ autoSubmit: { id: props.id });

    if (getUser.failed) return <div>Error fetching user</div>;
    if (!getUser.success) return <div>Loading..</div>;

    const user = getUser.data;

    return <div>{user.name}</div>;
}
```

- `useGetUser` can take an optional config object. See [config](./config.md) for details.
- The hook returns an array containing 3 items:
  - The first entry is the current state of the fetch request, containing the result or error data when it's done.
  - see [api](./api.md) below for the other items
