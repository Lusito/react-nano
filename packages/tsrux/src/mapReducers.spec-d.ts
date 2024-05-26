// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { expectType, expectAssignable } from "tsd";

import { Reducer, ReducerMap, ReducerMapActions, ReducerMapHandler, mapReducers } from "./mapReducers";
import {
    TestPayload,
    TestMeta,
    Action1,
    Action2,
    Action3,
    Action4,
    placeholder,
    actionCreator1,
    actionCreator4,
    actionCreator3,
    actionCreator2,
} from "./actionCreator.spec-d";
import { AnyAction } from "./actionCreator";

interface State {
    part1: TestPayload;
    part2: TestMeta;
}

const initialState: State = {
    part1: {
        foo: "woot",
        bar: 12,
    },
    part2: {
        hello: "woop",
        world: 13,
    },
};

/**
 * Type Reducer should work correctly
 */
type Reducer1 = Reducer<State, Action1>;
type Reducer2 = Reducer<State, Action2>;
type Reducer3 = Reducer<State, Action3>;
type Reducer4 = Reducer<State, Action4>;

expectType<(state: State, action: Action1) => State>(placeholder as Reducer1);
expectType<(state: State, action: Action2) => State>(placeholder as Reducer2);
expectType<(state: State, action: Action3) => State>(placeholder as Reducer3);
expectType<(state: State, action: Action4) => State>(placeholder as Reducer4);

/**
 * Type ReducerMap should work correctly
 */
expectAssignable<{
    "foo/bar/1": Reducer1;
    "foo/bar/2": Reducer2;
    "foo/bar/3": Reducer3;
    "foo/bar/4": Reducer4;
}>(placeholder as ReducerMap<State, Action1 | Action2 | Action3 | Action4>);

/**
 * Type ReducerMapActions should work correctly
 */
expectType<Action1 | Action2 | Action3 | Action4 | AnyAction>(
    placeholder as ReducerMapActions<ReducerMap<State, Action1 | Action2 | Action3 | Action4>>,
);

/**
 * Type ReducerMapHandler should work correctly
 */
expectType<ReducerMap<State, Action1>>(
    (placeholder as ReducerMapHandler<State>)(actionCreator1, (state, action) => {
        expectType<State>(state);
        expectType<Action1>(action);
        return state;
    }),
);
expectType<ReducerMap<State, Action2>>(
    (placeholder as ReducerMapHandler<State>)(actionCreator2, (state, action) => {
        expectType<State>(state);
        expectType<Action2>(action);
        return state;
    }),
);
expectType<ReducerMap<State, Action3>>(
    (placeholder as ReducerMapHandler<State>)(actionCreator3, (state, action) => {
        expectType<State>(state);
        expectType<Action3>(action);
        return state;
    }),
);
expectType<ReducerMap<State, Action4>>(
    (placeholder as ReducerMapHandler<State>)(actionCreator4, (state, action) => {
        expectType<State>(state);
        expectType<Action4>(action);
        return state;
    }),
);

/**
 * mapReducers should work correctly
 */
type ExpectedMappedReducerType = (
    state: State | undefined,
    action: ReducerMapActions<ReducerMap<State, Action1 | Action2 | Action3 | Action4>>,
) => State;

expectType<ExpectedMappedReducerType>(
    mapReducers(initialState, (handle) => [
        handle(actionCreator1, (state, action) => {
            expectType<State>(state);
            expectType<Action1>(action);
            return state;
        }),
        handle(actionCreator2, (state, action) => {
            expectType<State>(state);
            expectType<Action2>(action);
            return state;
        }),
        handle(actionCreator3, (state, action) => {
            expectType<State>(state);
            expectType<Action3>(action);
            return state;
        }),
        handle(actionCreator4, (state, action) => {
            expectType<State>(state);
            expectType<Action4>(action);
            return state;
        }),
    ]),
);
