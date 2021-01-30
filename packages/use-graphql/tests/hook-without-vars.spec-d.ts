import { expectType } from "tsd";

import { graphQL } from "../dist";
import { ErrorDTO, UserDTO } from "./types";

const useUserQuery = graphQL.query<UserDTO, ErrorDTO>("user").createHook({
    name: true,
    icon: true,
    posts: {
        id: true,
        title: true,
        hits: true,
    },
});

const [state, submit, abort] = useUserQuery({ url: "/graphql" });

expectType<() => void>(submit);
expectType<() => void>(abort);

if (state.state === "success") {
    expectType<{
        loading: boolean;
        failed: false;
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
        failed: false;
        state: "empty";
    }>(state);
} else if (state.state === "error") {
    expectType<{
        loading: boolean;
        failed: true;
        state: "error";
        responseHeaders: Headers;
        responseStatus: number;
        errors: ErrorDTO[];
    }>(state);
} else if (state.state === "exception") {
    expectType<{
        loading: boolean;
        failed: true;
        state: "exception";
        error: Error;
    }>(state);
}

// autoSubmit may not be object
// @ts-expect-error
useUserQuery({ url: "/graphql", autoSubmit: {} });

// autoSubmit must be true
useUserQuery({ url: "/graphql", autoSubmit: true });
