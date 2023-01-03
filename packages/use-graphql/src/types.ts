export type JsonPrimitive = null | string | number | boolean;
export type ResultType = JsonPrimitive | Record<string, any>;
export type VariableType = null | Record<string, any>;
export type ErrorType = Record<string, any>;

export interface GraphQLResponseInfo {
    /** The status code of the response */
    responseStatus: number;
    /** The headers of the response */
    responseHeaders: Headers;
}

export interface GraphQLRequestInit {
    readonly method: "POST";
    credentials: RequestCredentials;
    readonly headers: Headers;
    readonly body: string;
    readonly signal: AbortSignal;
}
