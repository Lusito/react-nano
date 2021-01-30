import { graphQL } from "../dist";
import { ErrorDTO, UserDTO } from "./types";

const query = graphQL.query<UserDTO, ErrorDTO>("user");
const mutation = graphQL.mutation<UserDTO, ErrorDTO>("user");

/// Variables may not be left out
// @ts-expect-error
query.with();
// @ts-expect-error
mutation.with();

/// Objects are not allowed to be selected via true
// @ts-expect-error
query.createHook({ posts: true });
// @ts-expect-error
mutation.createHook({ posts: true });

/// Attributes are not allowed to be selected via object
// @ts-expect-error
query.createHook({ id: {} });
// @ts-expect-error
mutation.createHook({ id: {} });

/// Allowed calls:
query.createHook({ id: true });
query.createHook({ id: true, posts: { hits: true } });
mutation.createHook({ id: true });
mutation.createHook({ id: true, posts: { hits: true } });
