// eslint-disable-next-line import/no-unresolved
import { expectType } from "tsd";

import { graphQL } from "../dist";
import { ErrorDTO, QueryUserVariables, queryUserVariableTypes, UserDTO } from "./types";

const useUserQuery = graphQL
    .query<UserDTO, ErrorDTO>("user")
    .with(queryUserVariableTypes)
    .createHook({
        name: true,
        icon: true,
        posts: {
            id: true,
            title: true,
            hits: true,
        },
    });

const [state, submit, abort] = useUserQuery({ url: "/graphql", autoSubmit: { id: "hello" } });

expectType<(vars: { id: string }) => void>(submit);
expectType<() => void>(abort);

if (state.state === "success") {
    expectType<{
        loading: boolean;
        failed: false;
        success: true;
        state: "success";
        responseHeaders: Headers;
        responseStatus: number;
        data: {
            name: string;
            icon: string;
            posts: Array<{
                id: number;
                title: string;
                hits: number;
            }>;
        };
    }>(state);
} else if (state.state === "empty") {
    expectType<{
        loading: boolean;
        success: false;
        failed: false;
        state: "empty";
    }>(state);
} else if (state.state === "error") {
    expectType<{
        loading: boolean;
        success: false;
        failed: true;
        state: "error";
        responseHeaders: Headers;
        responseStatus: number;
        errors: ErrorDTO[];
    }>(state);
} else if (state.state === "exception") {
    expectType<{
        loading: boolean;
        success: false;
        failed: true;
        state: "exception";
        error: Error;
    }>(state);
}

// autoSubmit may not be true
// @ts-expect-error
useUserQuery({ url: "/graphql", autoSubmit: true });

// autoSubmit may not specify unknown attributes
// @ts-expect-error
useUserQuery({ url: "/graphql", autoSubmit: { foo: "bar" } });

// autoSubmit may not specify extra attributes
// @ts-expect-error
useUserQuery({ url: "/graphql", autoSubmit: { id: "some-id", foo: "bar" } });

// autoSubmit must be object
useUserQuery({ url: "/graphql", autoSubmit: { id: "some-id" } });

// callback types must be correct
useUserQuery({
    url: "/graphql",
    onSuccess(context) {
        expectType<{
            data: {
                name: string;
                icon: string;
                posts: Array<{
                    id: number;
                    title: string;
                    hits: number;
                }>;
            };
            inputData: QueryUserVariables;
            status: number;
            responseHeaders: Headers;
        }>(context);
    },
    onError(context) {
        expectType<{
            errors: ErrorDTO[];
            inputData: QueryUserVariables;
            status: number;
            responseHeaders: Headers;
        }>(context);
    },
    onException(context) {
        expectType<{
            error: Error;
            inputData: QueryUserVariables;
        }>(context);
    },
});
