import { defaultGraphQLConfig, GraphQLConfig } from "./config";
import { GraphQLRequestInit, GraphQLResponseInfo } from "./types";

export interface GraphQLStateBase {
    /** Request is currently in progress */
    loading: boolean;
    /** Either an exception occurred or the request returned an error */
    failed: boolean;
    /** Request was successful */
    success: boolean;
}

export interface GraphQLStateEmpty extends GraphQLStateBase {
    state: "empty";
    failed: false;
    success: false;
}

export interface GraphQLStateDone extends GraphQLStateBase, GraphQLResponseInfo {}

export interface GraphQLStateDoneSuccess<TData> extends GraphQLStateDone {
    failed: false;
    success: true;
    /** Data is present */
    state: "success";
    /** The response data in case of success */
    data: TData;
}

export interface GraphQLStateDoneError<TError extends Record<string, any>> extends GraphQLStateDone {
    failed: true;
    success: false;
    /** Errors is present */
    state: "error";
    /** Request has finished with either an error or an exception. */
    errors: TError[];
}

export interface GraphQLStateDoneException extends GraphQLStateBase {
    failed: true;
    success: false;
    /** Errors is present */
    state: "exception";
    /** Request has finished with either an error or an exception. */
    error: Error;
}

export type GraphQLState<TData, TError extends Record<string, any>> =
    | GraphQLStateEmpty
    | GraphQLStateDoneSuccess<TData>
    | GraphQLStateDoneError<TError>
    | GraphQLStateDoneException;

interface GraphQLActionLoading {
    type: "loading";
    value: boolean;
}
interface GraphQLActionSuccess<TData> extends GraphQLResponseInfo {
    type: "success";
    data: TData;
}
interface GraphQLActionError<TError extends Record<string, any>> extends GraphQLResponseInfo {
    type: "error";
    errors: TError[];
}
interface GraphQLActionException {
    type: "exception";
    error: Error;
}

type GraphQLAction<TData, TError extends Record<string, any>> =
    | GraphQLActionLoading
    | GraphQLActionSuccess<TData>
    | GraphQLActionError<TError>
    | GraphQLActionException;

export function stateReducer<TData, TError extends Record<string, any>>(
    state: GraphQLState<TData, TError>,
    action: GraphQLAction<TData, TError>
): GraphQLState<TData, TError> {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: action.value,
            };
        case "success":
            return {
                failed: false,
                state: "success",
                success: true,
                loading: false,
                data: action.data,
                responseHeaders: action.responseHeaders,
                responseStatus: action.responseStatus,
            };
        case "error":
            return {
                failed: true,
                success: false,
                state: "error",
                loading: false,
                errors: action.errors,
                responseHeaders: action.responseHeaders,
                responseStatus: action.responseStatus,
            };
        case "exception":
            return {
                failed: true,
                success: false,
                state: "exception",
                loading: false,
                error: action.error,
            };
    }
    return state;
}

export class GraphQLStateManager<TResultData, TError> {
    public globalConfig?: GraphQLConfig<TResultData, TError, unknown>;

    public config?: GraphQLConfig<TResultData, TError, unknown>;

    public mounted = true;

    private query: string;

    private queryName: string;

    private controller?: AbortController;

    private updateState: (action: GraphQLAction<TResultData, TError>) => void;

    public constructor(
        query: string,
        queryName: string,
        updateState: (action: GraphQLAction<TResultData, TError>) => void
    ) {
        this.query = query;
        this.queryName = queryName;
        this.updateState = updateState;
    }

    public abort = () => {
        if (this.controller) {
            this.controller.abort();
            this.controller = undefined;
            this.mounted && this.updateState({ type: "loading", value: false });
        }
    };

    public submit = (variables?: Record<string, any>) => {
        this.submitAsync(variables);
    };

    private async submitAsync(variables?: Record<string, any>) {
        if (!this.mounted) return;

        const globalConfig = this.globalConfig ?? (defaultGraphQLConfig as GraphQLConfig<TResultData, TError, unknown>);
        const config = this.config ?? (defaultGraphQLConfig as GraphQLConfig<TResultData, TError, unknown>);
        let responseStatus = -1;
        try {
            this.controller?.abort();
            this.controller = new AbortController();
            this.updateState({ type: "loading", value: true });
            const init: GraphQLRequestInit = {
                method: "POST",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    query: this.query,
                    variables,
                }),
                signal: this.controller.signal,
            };
            globalConfig.onInit?.(init);
            if (!this.mounted) return;
            config.onInit?.(init);
            if (!this.mounted) return;
            const url = config.url ?? globalConfig.url ?? defaultGraphQLConfig.url;
            const response = await fetch(url, init);

            responseStatus = response.status;

            const json = await response.json();
            if (!this.mounted) return;

            if (response.ok && !json.errors) {
                const data: TResultData = json.data[this.queryName];
                const context = {
                    inputData: variables,
                    data,
                    status: responseStatus,
                    responseHeaders: response.headers,
                };
                globalConfig.onSuccess?.(context);
                if (!this.mounted) return;
                config.onSuccess?.(context);
                if (!this.mounted) return;
                this.updateState({
                    type: "success",
                    responseStatus: response.status,
                    responseHeaders: response.headers,
                    data,
                });
            } else {
                const { errors } = json;
                const context = {
                    inputData: variables,
                    errors,
                    status: responseStatus,
                    responseHeaders: response.headers,
                };
                globalConfig.onError?.(context);
                if (!this.mounted) return;
                config.onError?.(context);
                if (!this.mounted) return;
                this.updateState({
                    type: "error",
                    responseStatus: response.status,
                    responseHeaders: response.headers,
                    errors,
                });
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log(error);
                if (!this.mounted) return;
                globalConfig.onException?.(error);
                if (!this.mounted) return;
                config.onException?.(error);
                if (!this.mounted) return;
                this.updateState({
                    type: "exception",
                    error,
                });
            }
        }
    }
}
