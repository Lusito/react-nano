# @react-nano/use-graphql

A lightweight, type-safe graphql hook builder for react, written in TypeScript.

This is no code-generator. It works purely by using **TypeScript 4.1** features.

This is a **Work In Progress**! The API might change before version 1.0 is released.

## Overview

- **No Query Strings**\
Don't write query strings manually. Write TypeScript and get autocompletion for free!
- **Type-Safe**\
Instead of getting the full interface as a result type from a query/mutation, you only get those fields you actually selected in your hook definition!
- **Easy to Use**\
Write your types, define queries/mutations, use the hook, display data => done!

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
    if (userState.state !== "success") return <div>Loading</div>;

    // Unless you checked for state === "success", userState.data will not exist on the type.
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
