# Example: Modify Data

This builds upon what you've learned in the [Request Data](./get.md) section.

## Creating a Custom Fetch Hook

Let's say you have a form to submit updates on a user object.

Again, we'll need to create a custom hook. This time it will take a FormData object in addition to the id.

```tsx
import { setupFetch, preparePost } from "@react-nano/use-fetch";

export const useUpdateUser = createFetchHook({
  prepare: (init: FetchRequestInit, data: { id: number; formData: FormData }) => {
    prepareFormDataPost(init, data.formData);
    init.method = "PUT";
    return `api/user${data.id}`;
  },
  getResult: (response: Response) => response.json() as Promise<boolean>,
  getError: (response: Response) => response.json() as Promise<RestValidationErrorDTO>,
});
```

- `prepareFormDataPost` is a helper function, which will prepare the init object with a FormData object. See [helper functions](./helpers.md) for more details.
- Additionally, since `prepareFormDataPost` sets `init.method` to "POST", we override this here with a "PUT".
- In this case, we expect the server to return `true` on success, so the result type is `boolean`.
- Aside from that there is nothing special going on here.

## Using the Custom Fetch Hook

Here's how you might use the hook (in addition to `useGetUser` from the previous example):

```tsx
function EditUserComponent(props: { id: number }) {
  const [getUser] = useGetUser({ autoSubmit: { id: props.id } });
  const [updateUser, submitUpdateUser] = useUpdateUserFetch();

  if (getUser.failed) return <div>Error fetching user</div>;
  if (!getUser.success) return <div>Loading..</div>;

  const user = getUser.data;
  const validationErrors = getValidationErrors(updateUser);

  return (
    <Form
      onSubmit={(e) => submitUpdateUser({ id: props.id, formData: new FormData(e.currentTarget) })}
      loading={updateUser.loading}
    >
      <Input name="name" label="Name" placeholder="Name" error={validationErrors.name} defaultValue={user.name} />
      ...
      <ErrorMessageForState state={updateUser} />
      <button type="submit">Save</button>
    </Form>
  );
}
```

There's a lot more going on here:

- In addition to getting the user, which we already did in the first example,
- We're also using the `useUpdateUserFetch` hook. No `autoSubmit` config means we need to call it manually.
  - The second entry in the returned array is a submit function, which you can call to manually (re-)submit the request.
- The server returns a validation hashmap in case of an error (implementation is up to you).
- We're using some pseudo UI library to define our user form:
  - onSubmit is passed on to the `<form>` element, so we get notified of submits.
    - On submit, we create a new FormData object from the `<form>` element.
    - The biggest advantage of this is that you don't need to connect all of your input elements to your components state.
  - When an error happened, we try to show some information about it. See [API](./api.md) for more information on the state values.

In case you are wondering about the implementations of `ErrorMessageForState` and `getValidationErrors`, here they are:

```tsx
interface ErrorMessageForStateProps {
  state: FetchState<any, RestValidationErrorDTO>;
}

export function ErrorMessageForState({ state }: ErrorMessageForStateProps) {
  switch (state.state) {
    case "error":
      return <div>Error {state.error.error}</div>;
    case "exception":
      return <div>Error {state.error.message}</div>;
    default:
      return null;
  }
}

export function getValidationErrors(state: FetchState<any, RestValidationErrorDTO>) {
  return (state.state === "error" && state.error.validation_errors) || {};
}
```
