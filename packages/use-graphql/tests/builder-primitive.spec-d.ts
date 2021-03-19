import { expectType } from "tsd";

import { graphQL } from "../dist";
import { ErrorDTO, QueryUserVariables, queryUserVariableTypes } from "./types";

const query = graphQL.query<number, ErrorDTO>("time");
const mutation = graphQL.mutation<number, ErrorDTO>("time");

/// Fields may not be specified
// @ts-expect-error
query.createHook({});
// @ts-expect-error
mutation.createHook({});

/// Allowed calls:
query.createHook();
mutation.createHook();

/// Fields may not be specified
// @ts-expect-error
query.with(queryUserVariableTypes).createHook({});
// @ts-expect-error
mutation.with(queryUserVariableTypes).createHook({});

/// Variables may not be left out
// @ts-expect-error
query.with();
// @ts-expect-error
mutation.with();

/// Allowed calls:
query.with(queryUserVariableTypes).createHook();
mutation.with(queryUserVariableTypes).createHook();

// callback types must be correct
const useBooleanQuery = graphQL.query<boolean, ErrorDTO>("boolean").with(queryUserVariableTypes).createHook();
useBooleanQuery({
    onSuccess(context) {
        expectType<{
            data: boolean;
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
