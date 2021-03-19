export interface FetchRequestInit extends RequestInit {
    credentials: RequestCredentials;
    readonly headers: Headers;
    readonly signal: AbortSignal;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE";

export function prepareInit(init: FetchRequestInit, method: HttpMethod) {
    init.method = method;
    init.credentials = "include";
    init.headers.set("Accept", "application/json");
}

export const prepareGet = (init: FetchRequestInit) => prepareInit(init, "GET");

export const preparePost = (init: FetchRequestInit) => prepareInit(init, "POST");

export const preparePatch = (init: FetchRequestInit) => prepareInit(init, "PATCH");

export const preparePut = (init: FetchRequestInit) => prepareInit(init, "PUT");

export const prepareDelete = (init: FetchRequestInit) => prepareInit(init, "DELETE");

export function preparePostUrlEncoded(init: FetchRequestInit) {
    preparePost(init);
    init.headers.set("Content-Type", "application/x-www-form-urlencoded");
}

export function prepareFormDataPost(init: FetchRequestInit, formData: FormData) {
    const entries = Array.from(formData.entries());
    if (entries.some((entry) => entry[1] instanceof File)) {
        preparePost(init);
        init.body = formData;
    } else {
        preparePostUrlEncoded(init);
        init.body = entries.map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`).join("&");
    }
}
