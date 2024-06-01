// eslint-disable-next-line import/no-unresolved
import { expectType } from "tsd";

import { GraphGLVariableTypes } from "../dist";
import { PostDTO, QueryUserVariables } from "./types";

expectType<{
    id: string;
}>(0 as any as GraphGLVariableTypes<QueryUserVariables>);

// Only top-level attributes need to be specified:
expectType<{
    id: string;
    title: string;
    message: string;
    hits: string;
    user: string;
}>(0 as any as GraphGLVariableTypes<PostDTO>);

/// Missing variables not allowed
// @ts-expect-error
export const missingVars: GraphGLVariableTypes<QueryUserVariables> = {};

/// Wrong variable not allowed
// @ts-expect-error
export const wrongVars: GraphGLVariableTypes<QueryUserVariables> = { foo: "String!" };

/// Additional variables not allowed
// @ts-expect-error
export const additionalVars: GraphGLVariableTypes<QueryUserVariables> = { id: "String!", foo: "String!" };
