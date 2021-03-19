import { useContext, useLayoutEffect, useMemo, useReducer } from "react";

import { GraphQLConfig, GraphQLGlobalConfigContext, GraphQLLocalConfig } from "./config";
import { GraphQLState, GraphQLStateManager, stateReducer } from "./state";
import { JsonPrimitive, ResultType, VariableType } from "./types";

/* eslint-disable @typescript-eslint/ban-types */
function toVariableDef(variableTypes?: Record<string, string>) {
    if (!variableTypes) return "";
    const keys = Object.keys(variableTypes);
    if (keys.length === 0) return "";
    const parts = keys.map((key) => `$${key}: ${variableTypes[key]}`);
    return `(${parts.join(", ")})`;
}

function toVariablePass(variableTypes?: Record<string, string>) {
    if (!variableTypes) return "";
    const keys = Object.keys(variableTypes);
    if (keys.length === 0) return "";
    const parts = keys.map((key) => `${key}: $${key}`);
    return `(${parts.join(", ")})`;
}

type AttribMap = { [s: string]: undefined | boolean | AttribMap };

function toFieldsDef(flags?: null | AttribMap): string {
    if (!flags) return "";
    const keys = Object.keys(flags);
    if (keys.length === 0) return "";
    const result = ["{"];
    for (const key of keys) {
        const val = flags[key];
        if (val) {
            result.push(key);
            if (val !== true) {
                result.push(toFieldsDef(val));
            }
        }
    }
    result.push("}");
    return result.join(" ");
}

export type ChoicesDeep2<T> = [T] extends [JsonPrimitive]
    ? Partial<boolean>
    : T extends Array<infer T2>
    ? ChoicesDeep2<T2>
    : ChoicesDeep<T>;

export type ChoicesDeep<T extends Record<string, any>> = {
    [KeyType in keyof T]?: ChoicesDeep2<T[KeyType]>;
};

export type KeepField<TOpt> = TOpt extends object ? 1 : TOpt extends true ? 1 : 0;
export type TypeForChoice<T, TOpt> = [T] extends [JsonPrimitive]
    ? T
    : T extends Array<infer T2>
    ? Array<TypeForChoice<T2, TOpt>>
    : ChoicesToResult<T, TOpt>;
export type ChoicesToResult<T extends Record<string, any>, TOpt extends ChoicesDeep<T>> = {
    [P in keyof T as KeepField<TOpt[P]> extends 1 ? P : never]: TypeForChoice<T[P], TOpt[P]>;
};

export type GraphQLResultOf<T> = T extends GraphQLHook<infer TResultData, any, any> ? TResultData : never;

export type FieldChoicesFor<T extends ResultType> = [T] extends [JsonPrimitive]
    ? never
    : T extends Array<infer T2>
    ? FieldChoicesFor<T2>
    : T extends Record<string, any>
    ? ChoicesDeep<T>
    : never;

export type ReducedResult<T extends ResultType, TFieldChoices> = [T] extends [JsonPrimitive]
    ? T
    : T extends Array<infer T2>
    ? Array<ReducedResult<T2, TFieldChoices>>
    : T extends Record<string, any>
    ? ChoicesToResult<T, TFieldChoices>
    : never;

export type GraphQLHook<TResultData, TError, TVars extends VariableType> = (
    config?: GraphQLLocalConfig<TResultData, TError, TVars>
) => [GraphQLState<TResultData, TError>, TVars extends null ? () => void : (vars: TVars) => void, () => void];

function buildHook(
    type: "query" | "mutation",
    name: string,
    fields?: AttribMap,
    variableTypes?: Record<string, string>
): GraphQLHook<any, any, any> {
    const varsDef = toVariableDef(variableTypes);
    const varsPass = toVariablePass(variableTypes);
    const fieldsDef = toFieldsDef(fields);
    const query = `${type}${varsDef} { ${name}${varsPass} ${fieldsDef} }`;

    return (config) => {
        const [state, updateState] = useReducer(stateReducer, {
            failed: false,
            success: false,
            state: "empty",
            loading: !!config?.autoSubmit,
        });
        const manager = useMemo(() => new GraphQLStateManager(query, name, updateState), []);
        manager.globalConfig = useContext(GraphQLGlobalConfigContext) as GraphQLConfig<any, any>;
        manager.config = config;
        const autoSubmit = config?.autoSubmit;
        useLayoutEffect(() => {
            manager.mounted = true;
            if (autoSubmit) {
                if (autoSubmit === true) manager.submit();
                else manager.submit(autoSubmit as Record<string, any>);
            }

            return () => {
                manager.mounted = false;
                manager.abort();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [manager]);
        return [state, manager.submit, manager.abort];
    };
}

export type CreateHook<TFullResult extends ResultType, TError, TVars extends VariableType> = [TFullResult] extends [
    JsonPrimitive | JsonPrimitive[]
]
    ? () => GraphQLHook<ReducedResult<TFullResult, null>, TError, TVars>
    : <TFieldChoices extends FieldChoicesFor<TFullResult>>(
          fields: TFieldChoices
      ) => GraphQLHook<ReducedResult<TFullResult, TFieldChoices>, TError, TVars>;

export type HookBuilder<TFullResult extends ResultType, TError> = {
    createHook: CreateHook<TFullResult, TError, null>;
    with: <TVars extends Record<string, any>>(
        variableTypes: GraphGLVariableTypes<TVars>
    ) => {
        createHook: CreateHook<TFullResult, TError, TVars>;
    };
};

function hookBuilder<TFullResult extends ResultType, TError>(type: "query" | "mutation", name: string) {
    return {
        createHook: (fields) => buildHook(type, name, fields),
        with: (variableTypes: { [s: string]: string }) => ({
            createHook: (fields) => buildHook(type, name, fields, variableTypes),
        }),
    } as HookBuilder<TFullResult, TError>;
}

export type GraphQLBuilder = <TFullResult extends ResultType, TError>(name: string) => HookBuilder<TFullResult, TError>;

export type GraphQL = {
    query: GraphQLBuilder;
    mutation: GraphQLBuilder;
};

export const graphQL: GraphQL = {
    query: (name) => hookBuilder("query", name),
    mutation: (name) => hookBuilder("mutation", name),
};

export type GraphGLVariableTypes<T extends Record<string, any>> = {
    [P in keyof T]: string;
};
