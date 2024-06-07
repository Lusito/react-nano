# Hooks

## `useDispatch`

Use the hook to dispatch actions like this:

```tsx
import { useDispatch } from "@react-nano/redux";
export const MyComponent = () => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(subscribeAction())}>Subscribe</button>;
};
```

## `useSelector`

Use the hook to get a state property:

```tsx
import { useSelector } from "@react-nano/redux";

const selectTitle = (state: State) => state.title;

export const MyComponent = () => {
  const title = useSelector(selectTitle);

  return <h2>{title}</h2>;
};
```

### Custom Comparison Function

useSelector will detect changes in the value returned by the selector function by comparing the old value and the new value by reference. Only if they differ, the component will be re-rendered.

If you want more control, you can pass in a comparison function:

```tsx
import { useSelector } from "@react-nano/redux";

const selectUsers = (state: State) => state.users;

const sameMembersInArray = (a: User[], b: User[]) => {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
};

export const MyComponent = () => {
  const users = useSelector(selectUsers, sameMembersInArray);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

## `useStore`

In some rare occasions, you might want to access the store object itself:

```tsx
import { useStore } from "@react-nano/redux";
export const MyComponent = () => {
  const store = useStore();
  // ...
};
```
