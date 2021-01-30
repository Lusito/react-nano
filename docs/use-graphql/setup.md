# Setup

This library is shipped as es2015 modules. To use them in browsers, you'll have to transpile them using webpack or similar, which you probably already do.

## TypeScript

Ensure you have at least TypeScript 4.1 in your setup.

## Install via NPM or YARN

<code-group>
<code-block title="NPM" active>
```bash
npm i @react-nano/use-graphql
```
</code-block>

<code-block title="YARN">
```bash
yarn add @react-nano/use-graphql
```
</code-block>
</code-group>

## Define Types

Define your full types somewhere (i.e. all types and attributes that could possibly be requested, including their relations), for example:

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
