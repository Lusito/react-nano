import { createContext } from "react";

import { GraphQLRequestInit, VariableType } from "./types";

export interface GraphQLConfig<TData, TError extends Record<string, any>> {
    /** The url to use. Defaults to "/graphql" if neither global nor local config specifies it */
    url?: string;

    /**
     * Called right before a request will be made. Use it to extend the request with additional information like authorization headers.
     *
     * @param init The request data to be send.
     */
    onInit?(init: RequestInit & GraphQLRequestInit): void;

    /**
     * Called on successful request with the result
     *
     * @param data The result of the query/mutation
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onSuccess?(data: TData, status: number, responseHeaders: Headers): void;

    /**
     * Called on server error
     *
     * @param errors The errors the server returned for the query/mutation
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onError?(errors: TError[], status: number, responseHeaders: Headers): void;

    /**
     * Called when an exception happened in the frontend
     *
     * @param error The error that was thrown.
     */
    onException?(error: Error): void;
}

export interface GraphQLLocalConfig<TData, TError extends Record<string, any>, TVars extends VariableType>
    extends GraphQLConfig<TData, TError> {
    /** Specify to cause the request to be submitted automatically */
    autoSubmit?: TVars extends null ? true : TVars;
}

export const defaultGraphQLConfig = { url: "/graphql" };

export const GraphQLGlobalConfigContext = createContext<GraphQLConfig<unknown, Record<string, unknown>>>(defaultGraphQLConfig);
export const GraphQLGlobalConfigProvider = GraphQLGlobalConfigContext.Provider;
