import { createContext } from "react";

import { GraphQLRequestInit, VariableType } from "./types";

export interface CallbackContext<TVars> {
    /** The data you used to submit the request */
    inputData: TVars;
}

export interface CallbackContextWithResponse<TVars> extends CallbackContext<TVars> {
    /** The status code of the request */
    status: number;
    /** The response headers headers of the request */
    responseHeaders: Headers;
}

export interface OnSuccessContext<TVars, TData> extends CallbackContextWithResponse<TVars> {
    /** The result of the query/mutation */
    data: TData;
}

export interface OnErrorContext<TVars, TError> extends CallbackContextWithResponse<TVars> {
    /** The errors the server returned for the query/mutation */
    errors: TError[];
}

export interface OnExceptionContext<TVars> extends CallbackContext<TVars> {
    /** The error that was thrown. */
    error: Error;
}

export interface GraphQLConfig<TData, TError extends Record<string, any>, TVars> {
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
     * @param context Information about the request
     */
    onSuccess?(context: OnSuccessContext<TVars, TData>): void;

    /**
     * Called on server error
     *
     * @param context Information about the request
     */
    onError?(context: OnErrorContext<TVars, TError>): void;

    /**
     * Called when an exception happened in the frontend
     *
     * @param context Information about the request
     */
    onException?(context: OnExceptionContext<TVars>): void;
}

export interface GraphQLLocalConfig<TData, TError extends Record<string, any>, TVars extends VariableType>
    extends GraphQLConfig<TData, TError, TVars> {
    /** Specify to cause the request to be submitted automatically */
    autoSubmit?: TVars extends null ? true : TVars;
}

export const defaultGraphQLConfig = { url: "/graphql" };

export const GraphQLGlobalConfigContext = createContext<GraphQLConfig<unknown, Record<string, unknown>, unknown>>(
    defaultGraphQLConfig
);
export const GraphQLGlobalConfigProvider = GraphQLGlobalConfigContext.Provider;
