# Action Creators

Action creators are used to easily create actions. Defining action creators enables us to use their types in reducers!

## Without Payload and Metadata

The first parameter of `actionCreator()` is the type of the action.
If you don't specify further parameters, the returned function receives no arguments:

```typescript
import { actionCreator } from "@react-nano/tsrux";

const fetchTodos = actionCreator("TODOS/FETCH");

// When called returns: { type: "TODOS/FETCH" }
console.log(fetchTodos());

// Has a static property type="TODOS/FETCH"
console.log(fetchTodos.type);

```

## With Payload, but Without Metadata

The second, optional parameter of `actionCreator()` is a factory function to create the payload of the action.
If you specify it, the returned function receives the same arguments as your factory function:

```typescript
import { actionCreator } from "@react-nano/tsrux";

const setTodoChecked = actionCreator("TODOS/SET_CHECKED", (id: number, checked: boolean) => ({ id, checked }));

// When called returns: { type: "TODOS/SET_CHECKED", payload: { id: 42, checked: true } }
console.log(setTodoChecked(42, true));
```

## With Payload and Metadata

The third, optional parameter of `actionCreator()` is a factory function to create the metadata of the action.
If you specify it, the returned function receives the same arguments as your factory function. As such, it must have the same signature as your payload factory:

```typescript
import { actionCreator } from "@react-nano/tsrux";

const removeTodo = actionCreator("TODOS/REMOVE", (id: number) => ({ id }), (id: number) => ({ metaId: id, foo: "bar" }));

// When called returns: { type: "TODOS/REMOVE", payload: { id: 42 }, meta: { metaId: id, foo: "bar" } }
console.log(removeTodo(42));
```

## Without Payload, but With Metadata

Of course, you can also leave out the payload factory:

```typescript
import { actionCreator } from "@react-nano/tsrux";

const removeTodo = actionCreator("TODOS/FOO", undefined, (id: number) => ({ metaId: id, foo: "bar" }));

// When called returns: { type: "TODOS/FOO", meta: { metaId: id, foo: "bar" } }
console.log(removeTodo(42));
```
