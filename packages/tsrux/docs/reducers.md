# Reducers

Reducers apply your actions to the state.

## Initial State

First, you'll need to create an initial state. Some typing might be required here, some can be infered:
```typescript
import { mapReducers } from "@react-nano/tsrux";

// Some types, you obviously still need
interface TodoEntry {
    id: number;
    label: string;
    checked: boolean;
}

const initialState = {
    list: [] as TodoEntry[],
    nextId: 0,
};

// Some types you can infer from a variable
export type TodoState = typeof initialState;

```

## Handle Actions

When using `mapReducers()`, you don't need to define any more types!

- This function is used to create a reducer for multiple actions.
- It receives the initial state and a callback.
  - The callback is used to set up action handlers and returns an array of action handlers.

```typescript
export const todosReducer = mapReducers(initialState, (handle) => [
    // handle(actionCreator, reducer) helps you define a reducer responsible for one single action.
    // Both state and action know their types without needing to manually specify them!
    handle(addTodo, (state, action) => ({
        ...state,
        list: [...state.list, { id: state.nextId, label: action.payload.label, checked: false }],
        nextId: state.nextId + 1,
    })),
    handle(setTodoChecked, (state, action) => ({
        ...state,
        list: state.list.map((todo) => {
            if (todo.id === action.payload.id)
                return { ...todo, checked: action.payload.checked };
            return todo;
        })
    })),
    handle(removeTodo, (state, action) => ({
        ...state,
        // Complains about next line: payload does not have an attribute named "ID"
        list: state.list.filter((todo) => todo.id !== action.payload.ID),
    }))
]);
```
