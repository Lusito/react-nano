/**
 * Definition of an Action, possibly including a payload and/or a meta attribute.
 *
 * @property type       he type used to identify this action
 * @property payload    The payload
 * @property meta       The metadata
 */
export type Action<TType extends string, TPayload = undefined, TMeta = undefined> = TPayload extends undefined
    ? TMeta extends undefined
        ? { type: TType }
        : { type: TType; meta: TMeta }
    : TMeta extends undefined
    ? { type: TType; payload: TPayload }
    : { type: TType; payload: TPayload; meta: TMeta };

export type AnyAction = Action<string, any, any>;

/**
 * An Action creator is used to create actions.
 *
 * @param ...args   Parameters required to create the action
 * @property type   The type, which will be set in the action.
 */
export type ActionCreator<
    TType extends string,
    TAction extends Action<TType, any, any>,
    TParams extends any[] = any[]
> = ((...args: TParams) => TAction) & { type: TType };

export type ActionOf<TActionCreator extends ActionCreator<any, any, any>> = ReturnType<TActionCreator>;

/**
 * Redux Action Creator Factory
 *
 * @param type          The type to be used in created types.
 * @param getPayload    Optional. A function used to create the payload. The parameters are up to you!
 * @param getMeta       Optional. A function used to create the metadata. The parameters must match getPayload!
 * @returns An ActionCreator.
 */
export function actionCreator<TType extends string>(type: TType): (() => Action<TType>) & { type: TType };
export function actionCreator<TType extends string, TParams extends any[], TPayload = undefined, TMeta = undefined>(
    type: TType,
    getPayload?: (...args: TParams) => TPayload,
    getMeta?: (...args: TParams) => TMeta
): ((...args: TParams) => Action<TType, TPayload, TMeta>) & { type: TType };
export function actionCreator<TType extends string, TParams extends any[], TPayload = undefined, TMeta = undefined>(
    type: TType,
    getPayload?: (...args: TParams) => TPayload,
    getMeta?: (...args: TParams) => TMeta
): ActionCreator<TType, Action<TType, TPayload, TMeta>, TParams> {
    const creator = (...args: TParams) => {
        const action: { type: TType; payload?: TPayload; meta?: TMeta } = { type };
        if (getPayload) action.payload = getPayload(...args);
        if (getMeta) action.meta = getMeta(...args);
        return action;
    };
    return Object.assign(creator as any, { type });
}
