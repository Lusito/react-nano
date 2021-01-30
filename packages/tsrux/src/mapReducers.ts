import { AnyAction, ActionCreator } from "./actionCreator";

/**
 * Definition of a reducer
 *
 * @param state     The previous state
 * @param action    The action to handle
 * @returns The new state
 */
export type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;

/**
 * Definition of a reducer map.. For internal use.
 */
export type ReducerMap<TState, TAction extends AnyAction> = {
    [TType in TAction["type"]]: Reducer<TState, TAction>;
};

/**
 * Infer actions of a reducer map.. For internal use.
 */
export type ReducerMapActions<TReducerMap> = TReducerMap extends ReducerMap<any, infer TAction>
    ? TAction | AnyAction
    : never;

/**
 * A callback used to create a reducer for one single action.
 *
 * @param actionCreator The action creator is used to determine the action type.
 * @param reducer       The reducer works the usual way, except, that you don't need to specify types anymore. And it only handles one action.
 */
export type ReducerMapHandler<TState> = <TAction extends AnyAction>(
    actionCreator: ActionCreator<any, TAction, any[]>,
    reducer: Reducer<TState, TAction>
) => ReducerMap<TState, TAction>;

/**
 * Creates a reducer, which is capable of infering the type of action for each reducer based on the action-creators.
 *
 * @param defaultState  The initial state value
 * @param setup         This function is used to set up the contained reducers.
 */
export function mapReducers<TState, TReducerMap extends ReducerMap<TState, any>>(
    defaultState: TState | undefined,
    setup: (handle: ReducerMapHandler<TState>) => TReducerMap[]
): (state: TState | undefined, action: ReducerMapActions<TReducerMap>) => TState {
    const map = Object.assign({}, ...setup((actionCreator, reducer) => ({ [actionCreator.type]: reducer } as any)));
    // eslint-disable-next-line @typescript-eslint/default-param-last
    return (state = defaultState, action) => {
        const reducer = map[action.type];
        return reducer ? reducer(state, action) : state;
    };
}
