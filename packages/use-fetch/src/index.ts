import { useLayoutEffect, useContext, useMemo, useReducer, createContext } from "react";

import { FetchRequestInit } from "./helpers";

export * from "./helpers";

const FetchGlobalConfigContext = createContext<FetchConfig<unknown, Record<string, unknown>>>({});
export const FetchGlobalConfigProvider = FetchGlobalConfigContext.Provider;

export interface FetchResponseInfo {
    /** The status code of the response */
    responseStatus: number;
    /** The headers of the response */
    responseHeaders: Headers;
}

export interface FetchStateBase {
    /** Request is currently in progress */
    loading: boolean;
    /** Either an exception occurred or the request returned an error */
    failed: boolean;
    /** Request was successful */
    success: boolean;
}

export interface FetchStateEmpty extends FetchStateBase {
    state: "empty";
    failed: false;
    success: false;
}

export interface FetchStateDone extends FetchStateBase, FetchResponseInfo {}

export interface FetchStateDoneSuccess<TData> extends FetchStateDone {
    failed: false;
    success: true;
    /** Data is present */
    state: "success";
    /** The response data in case of success */
    data: TData;
}

export interface FetchStateDoneError<TError extends Record<string, any>> extends FetchStateDone {
    failed: true;
    success: false;
    /** Errors is present */
    state: "error";
    /** The server result data. */
    error: TError;
}

export interface FetchStateDoneException extends FetchStateBase {
    failed: true;
    success: false;
    /** Errors is present */
    state: "exception";
    /** The cause of the exception. */
    error: Error;
}

export type FetchState<TData, TError extends Record<string, any>> =
    | FetchStateEmpty
    | FetchStateDoneSuccess<TData>
    | FetchStateDoneError<TError>
    | FetchStateDoneException;

export interface FetchConfig<TData, TError extends Record<string, any>> {
    /**
     * Called right before a request will be made. Use it to extend the request with additional information like authorization headers.
     *
     * @param init The request data to be send.
     */
    onInit?(init: FetchRequestInit): void;

    /**
     * Called on successful request with the result
     *
     * @param data The result of the fetch
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onSuccess?(data: TData, status: number, responseHeaders: Headers): void;

    /**
     * Called on server error
     *
     * @param data The error data the server returned for the fetch
     * @param status The status code of the request
     * @param responseHeaders The response headers headers of the request
     */
    onError?(data: TError, status: number, responseHeaders: Headers): void;

    /**
     * Called when an exception happened in the frontend
     *
     * @param error The error that was thrown.
     */
    onException?(error: Error): void;
}

export type VariableType = null | Record<string, any>;

export interface FetchLocalConfig<TData, TError extends Record<string, any>, TVars extends VariableType>
    extends FetchConfig<TData, TError> {
    /** Specify to cause the request to be submitted automatically */
    autoSubmit?: TVars extends null ? true : TVars;
}

export interface FetchInitializerBase<TResultData, TError> {
    /**
     * Called on successful request with the result. Use to specify the result type
     *
     * @param response The response
     */
    getResult: (response: Response) => Promise<TResultData>;

    /**
     * Called on server error
     *
     * @param response The response
     */
    getError: (response: Response) => Promise<TError>;
}

export interface FetchInitializerNoData<TResultData, TError> extends FetchInitializerBase<TResultData, TError> {
    /**
     * Called right before a request will be made. Use it to extend the request with additional information like authorization headers.
     *
     * @param init The request data to be send.
     * @returns The url to fetch
     */
    prepare: (init: FetchRequestInit) => string;
}

export interface FetchInitializerWithData<TResultData, TError, TVars extends Record<string, any>>
    extends FetchInitializerBase<TResultData, TError> {
    /**
     * Called right before a request will be made. Use it to extend the request with additional information like authorization headers.
     *
     * @param init The request data to be send.
     * @param data The data passed in via submit or autoSubmit
     * @returns The url to fetch
     */
    prepare: (init: FetchRequestInit, data: TVars) => string;
}

interface FetchActionLoading {
    type: "loading";
    value: boolean;
}
interface FetchActionSuccess<TData> extends FetchResponseInfo {
    type: "success";
    data: TData;
}
interface FetchActionError<TError extends Record<string, any>> extends FetchResponseInfo {
    type: "error";
    error: TError;
}
interface FetchActionException {
    type: "exception";
    error: Error;
}

type FetchAction<TData, TError extends Record<string, any>> =
    | FetchActionLoading
    | FetchActionSuccess<TData>
    | FetchActionError<TError>
    | FetchActionException;

function stateReducer<TData, TError extends Record<string, any>>(
    state: FetchState<TData, TError>,
    action: FetchAction<TData, TError>
): FetchState<TData, TError> {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: action.value,
            };
        case "success":
            return {
                failed: false,
                success: true,
                state: "success",
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
                error: action.error,
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

class FetchInstance<TResultData, TError, TVars extends VariableType> {
    public globalConfig?: FetchConfig<TResultData, TError>;

    public config?: FetchConfig<TResultData, TError>;

    public mounted = true;

    private initializer: TVars extends null
        ? FetchInitializerNoData<TResultData, TError>
        : FetchInitializerWithData<TResultData, TError, any>;

    private controller?: AbortController;

    private updateState: (action: FetchAction<TResultData, TError>) => void;

    public constructor(
        initializer: TVars extends null
            ? FetchInitializerNoData<TResultData, TError>
            : FetchInitializerWithData<TResultData, TError, any>,
        updateState: (action: FetchAction<TResultData, TError>) => void
    ) {
        this.initializer = initializer;
        this.updateState = updateState;
    }

    public abort = () => {
        if (this.controller) {
            this.controller.abort();
            this.controller = undefined;
            this.mounted && this.updateState({ type: "loading", value: false });
        }
    };

    public submit = (requestData: TVars) => {
        this.submitAsync(requestData);
    };

    private async submitAsync(requestData: TVars) {
        if (!this.mounted) return;

        const globalConfig = this.globalConfig ?? {};
        const config = this.config ?? {};
        const { initializer } = this;

        let responseStatus = -1;
        try {
            this.controller?.abort();
            this.controller = new AbortController();
            this.updateState({ type: "loading", value: true });
            const init: FetchRequestInit = {
                credentials: "include",
                headers: new Headers(),
                signal: this.controller.signal,
            };
            const url = initializer.prepare(init, requestData);
            const response = await fetch(url, init);

            responseStatus = response.status;

            if (response.ok) {
                const data = await initializer.getResult(response);
                if (!this.mounted) return;
                globalConfig.onSuccess?.(data, responseStatus, response.headers);
                if (!this.mounted) return;
                config.onSuccess?.(data, responseStatus, response.headers);
                if (!this.mounted) return;
                this.updateState({
                    type: "success",
                    responseStatus: response.status,
                    responseHeaders: response.headers,
                    data,
                });
            } else {
                const error = await initializer.getError(response);
                if (!this.mounted) return;
                globalConfig.onError?.(error, responseStatus, response.headers);
                if (!this.mounted) return;
                config.onError?.(error, responseStatus, response.headers);
                if (!this.mounted) return;
                this.updateState({
                    type: "error",
                    responseStatus: response.status,
                    responseHeaders: response.headers,
                    error,
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

export type FetchSubmit<TVars extends VariableType> = TVars extends null ? () => void : (vars: TVars) => void;

export type FetchHook<TResultData, TError, TVars extends VariableType> = (
    config?: FetchLocalConfig<TResultData, TError, TVars>
) => [FetchState<TResultData, TError>, FetchSubmit<TVars>, () => void];

export function createFetchHook<TResultData, TError>(
    initializer: FetchInitializerNoData<TResultData, TError>
): FetchHook<TResultData, TError, null>;
export function createFetchHook<TResultData, TError, TVars extends Record<string, any>>(
    initializer: FetchInitializerWithData<TResultData, TError, TVars>
): FetchHook<TResultData, TError, TVars>;
export function createFetchHook<TResultData, TError, TVars extends VariableType>(initializer: any) {
    return (config?: FetchLocalConfig<TResultData, TError, TVars>) => {
        const [state, updateState] = useReducer(stateReducer, {
            failed: false,
            success: false,
            state: "empty",
            loading: !!config?.autoSubmit,
        });
        const instance = useMemo(() => new FetchInstance(initializer, updateState), []);
        instance.globalConfig = useContext(FetchGlobalConfigContext) as FetchConfig<TResultData, TError>;
        instance.config = config;
        const autoSubmit = config?.autoSubmit;
        useLayoutEffect(() => {
            instance.mounted = true;
            if (autoSubmit) {
                if (autoSubmit === true) instance.submit(null);
                else instance.submit(autoSubmit as TVars);
            }

            return () => {
                instance.mounted = false;
                instance.abort();
            };
        }, [instance, autoSubmit]);
        return [state, instance.submit, instance.abort] as any;
    };
}
