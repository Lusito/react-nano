# Hook Builder

## Specifying a Query or Mutation

The `graphQL` builder pattern helps you to define a query or mutation [hook](./hook.md), which can then be used in your component.

The first thing you do is define the type (query or mutation) and its name like this:

### Query

```typescript
const useUserQuery = graphQL.query<UserDTO, ErrorDTO>("user");
// ... see next steps
```

### Mutation

```typescript
const useUpdateUserMutation = graphQL.mutation<Partial<UserDTO>, ErrorDTO>("updateUser");
// ...see next steps
```

As you can see, `graphQL.query` and `graphQL.mutation` also require two type arguments to be specified:

- The full type that could be returned by the server if all fields had been selected
- The error type that would be returned by the server in case of an error (the non-array form).

## Specifying Variable Types

After that you can optionally specify variable types for this query/mutation:

```typescript
    // ...see previous step
    .with(queryUserVariableTypes)
    // ...see next step
```

See [setup](./setup.md) for the definition of `queryUserVariableTypes`.

## Creating the Hook

The final step is to create a hook, which can then be used in your components.

- If your request returns a primitive or an array of primitives like `number`, `string` or `string[]`, you obviously can't select any fields, so createHook takes no arguments.
- Otherwise the first (and only) argument is an object with `true` for each attribute and an object for the relations you want to get returned (similarly to a GraphQL query string):

### Non-primitive return type

```typescript
    // ...see previous steps
    .createHook({
        // These properties will be autocompleted based on the first type argument of the query call above
        name: true,
        icon: true,
        posts: {
            id: true,
            title: true,
            hits: true,
        },
    });
```

### Primitive return type

```typescript
    // ...see previous steps
    .createHook();
```

## Examples

Here are two full examples:

### Complex Type With Variables

```TypeScript
import { graphQL } from "@react-nano/use-graphql";
// See "Setup" section for these types
import { UserDTO, ErrorDTO, queryUserVariableTypes } from '../types';

// No need to write the query as string. Write it in TypeScript and get autocompletion for free!
const useUserQuery = graphQL
    .query<UserDTO, ErrorDTO>("user")
    .with(queryUserVariableTypes)
    .createHook({
        // These properties will be autocompleted based on the first type argument of the query call above
        name: true,
        icon: true,
        posts: {
            id: true,
            title: true,
            hits: true,
        }
    });

```

### Primitive Type Without Variables

```TypeScript
import { graphQL } from "@react-nano/use-graphql";

const useUserNamesQuery = graphQL.query<string[], ErrorDTO>("userNames").createHook();
```
