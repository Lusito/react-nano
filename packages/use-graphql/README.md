# @react-nano/use-graphql

[![License](https://flat.badgen.net/github/license/lusito/react-nano?icon=github)](https://github.com/Lusito/react-nano/blob/master/LICENSE)
[![Minified + gzipped size](https://flat.badgen.net/bundlephobia/minzip/@react-nano/use-graphql?icon=dockbit)](https://bundlephobia.com/result?p=@react-nano/use-graphql)
[![NPM version](https://flat.badgen.net/npm/v/@react-nano/use-graphql?icon=npm)](https://www.npmjs.com/package/@react-nano/use-graphql)
[![Stars](https://flat.badgen.net/github/stars/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)
[![Watchers](https://flat.badgen.net/github/watchers/lusito/react-nano?icon=github)](https://github.com/lusito/react-nano)

A lightweight, type-safe graphql hook for react, written in TypeScript.

## Why Use @react-nano/use-graphql?

- Very lightweight (see the badges above for the latest size).
- Flexible and dead simple to use.
- Written in TypeScript
- Type-safe results (tested with [tsd](https://github.com/SamVerschueren/tsd))
- Autocompletion while writing query definitions
- Only has one required peer dependency: React 16.8.0 or higher.
- Liberal license: [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE)

This is no code-generator. It works purely by using **TypeScript 4.1** features.

- **No Query Strings**\
Don't write query strings manually. Write TypeScript and get autocompletion for free!
- **Type-Safe**\
Instead of getting the full interface as a result type from a query/mutation, you only get those fields you actually selected in your hook definition!
- **Easy to Use**\
Write your types, define queries/mutations, use the hook, display data => done!

This is a **Work In Progress**! The API might change before version 1.0 is released.

## Simple Example

In your component file, define your customized GraphQL hook and use it in the component:
```tsx
import React from 'react';
import { graphQL } from "@react-nano/use-graphql";
import { UserDTO, ErrorDTO, queryUserVariableTypes } from '../types';

// No need to write the query as string. Write it in TypeScript and get autocompletion for free!
const useUserQuery = graphQL
    .query<UserDTO, ErrorDTO>("user")
    .with(queryUserVariableTypes)
    .createHook({
    // These properties will be autocompleted based on the first type argument above
    name: true,
    icon: true,
    posts: {
        id: true,
        title: true,
        hits: true,
    }
});

export function UserSummary({ id }: UserSummaryProps) {
    // It is possible to supply the url globally using a provider
    // autoSubmit results in the request being send instantly. You can trigger it manually as well.
    const [userState] = useUserQuery({ url: "/graphql", autoSubmit: { id } });

    // There is more state information available. This is just kept short for an overview!
    if (!userState.success) return <div>Loading</div>;

    // Unless you checked for userState.state === "success" (or userState.success), userState.data will not exist on the type.
    const user = userState.data;
    return (
        <ul>
            <li>Name: {user.name}</li>
            <li>Icon: <img src={user.icon} alt="User Icon" /></li>
            <li>Age: {user.age /* Error: No property 'age' on user! */}</li>
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

In the above example, the type of `userState.data` is automatically created by inspecting the attribute choices specified in the fields definition of your hook.

So, even though `UserDTO` specifies the properties `id` and `age` and `PostDTO` specifies `message` and `user`, they will not end up in the returned data type and will lead to a compile-time error when you try to access them. For all other properties you will get autocompletion and type-safety.

To use the above example, you'll need to define your full types somewhere (i.e. all types and attributes that could possibly be requested):

```TypeScript
import { GraphGLVariableTypes } from "@react-nano/use-graphql";

export interface ErrorDTO {
    message: string;
}

export interface PostDTO {
    id: number;
    title: string;
    message: string;
    hits: number;
    user: UserDTO;
}

export interface UserDTO {
    id: string;
    name: string;
    icon: string;
    age: number;
    posts: PostDTO[];
}

export interface QueryUserVariables {
    id: string;
}

// Also specify GraphQL variable types as a constant like this:
const queryUserVariableTypes: GraphGLVariableTypes<QueryUserVariables> = {
    // These will be autocompleted (and are required) based on the type argument above
    // The values here are the only place where you still need to write GraphQL types.
    id: "String!",
};

```

## How to Use

Check out the [documentation](https://lusito.github.io/react-nano/use-graphql/)

## Report Issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/react-nano/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

@react-nano has been released under the [zlib/libpng](https://github.com/Lusito/react-nano/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
