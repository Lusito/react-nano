import { expectType } from "tsd";

import { graphQL } from "../dist";
import { ErrorDTO, queryUserVariableTypes } from "./types";

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

// Special case where boolean result type resulted in type of data=any
const useBooleanQuery = graphQL.query<boolean, ErrorDTO>("boolean").createHook();
useBooleanQuery({
    onSuccess(value) {
        expectType<boolean>(value);
    },
});
