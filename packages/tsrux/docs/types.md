# Additional Types

Some convenience types are included for the rare case where you do need to write types.

## Prefer `typeof`

In a lot of situations you can get the types using typescripts `typeof` keyword.

For example, if you want to get the type of an actionCreator:

```typescript
type AddTodoActionCreator = typeof addTodo;
```

## `ActionOf`

```typescript
type ActionOf<TActionCreator extends ActionCreator<any, any, any>>
```

This can be used to determine the `Action` type by inspecting an action-creator:

```typescript
type AddTodoAction = ActionOf<typeof addTodo>;
```

## `Action`

Use this type if you need to manually define the type of an action:

```typescript
type Action<TType extends string, TPayload = undefined, TMeta = undefined>
```

## `AnyAction`

```typescript
type AnyAction
```

Any action can be assigned to this type.

## `ActionCreator`

```typescript
type ActionCreator<
    TType extends string,
    TAction extends Action<TType, any, any>,
    TParams extends any[] = any[]
>
```

This describes the type of an action creator. It is mostly for internal use.
