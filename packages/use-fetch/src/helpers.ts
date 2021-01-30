export interface FetchRequestInit extends RequestInit {
    credentials: RequestCredentials;
    readonly headers: Headers;
    readonly signal: AbortSignal;
}

export function prepareGet(init: FetchRequestInit) {
    init.method = "GET";
    init.credentials = "include";
    init.headers.set("Accept", "application/json");
}

export function preparePost(init: FetchRequestInit) {
    init.method = "POST";
    init.credentials = "include";
    init.headers.set("Accept", "application/json");
}

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
