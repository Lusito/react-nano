// eslint-disable-next-line import/no-unresolved
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { PropsWithChildren, createContext, useContext, useRef, FC } from "react";
import { Store, AnyAction, Action } from "redux";

const ReduxContext = createContext<Store | null>(null);
/** A provider receives a store and children */
export type ProviderProps = PropsWithChildren<{
    /** The store object to provide to all nested components */
    store: Store;
}>;

/**
 * The redux store provider
 * @param props store and children
 */
export const Provider: FC<ProviderProps> = ({ store, children }) => (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
);

/**
 * A hook to access the redux store
 * @throws When a `Provider` is missing.
 */
export function useStore<TState = any, TAction extends Action = AnyAction>() {
    const store = useContext(ReduxContext);
    if (!store) {
        throw new Error("Could not find react redux context. Make sure you've added a Provider.");
    }
    return store as unknown as Store<TState, TAction>;
}

/** Compare by reference */
export function compareRef<T>(a: T, b: T) {
    return a === b;
}

/**
 * A hook to use a selector function to access redux state.
 * @param selector  The selector function to retrieve a value from the redux store. It receives the current redux state.
 * @param compare   The comparison function to use in order to only trigger a fresh render when something changed. Default compare by reference.
 * @throws When a `Provider` is missing.
 */
export function useSelector<TState = any, TAction extends Action = AnyAction, TResult = any>(
    selector: (state: TState) => TResult,
    compare: (a: TResult, b: TResult) => boolean = compareRef,
) {
    const store = useStore<TState, TAction>();
    const cache = useRef<{ value: TResult } | null>(null);

    return useSyncExternalStore(store.subscribe, () => {
        const value = selector(store.getState());
        if (!cache.current || !compare(cache.current.value, value)) {
            cache.current = { value };
        }

        return cache.current.value;
    });
}

/**
 * A hook to get the redux stores dispatch function.
 * @throws When a `Provider` is missing.
 */
export function useDispatch<TState = any, TAction extends Action = AnyAction>() {
    return useStore<TState, TAction>().dispatch;
}
