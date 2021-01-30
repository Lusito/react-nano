import { actionCreator } from "./actionCreator";
import { mapReducers } from "./mapReducers";

const actionCreator1 = actionCreator("foo/action1");
const actionCreator2 = actionCreator(
    "bar/action2",
    (hello: string, world: number) => ({ hello, world }),
    (foo: string, bar: number) => ({ foo, bar })
);

const action1 = actionCreator1();
const action2 = actionCreator2("ultimate answer", 42);

const initialState = {
    foo: "woot",
    bar: 13,
    wat: true,
};

describe("mapReducers", () => {
    describe("with state=undefined", () => {
        it("passes the initialState to the handler and returns the value returned by the handler", () => {
            const handler1 = jest.fn().mockReturnValueOnce("newState1");
            const handler2 = jest.fn().mockReturnValueOnce("newState2");
            const reducer = mapReducers(initialState, (handle) => [
                handle(actionCreator1, handler1),
                handle(actionCreator2, handler2),
            ]);
            expect(reducer(undefined, action1)).toBe("newState1");
            expect(handler1).toHaveBeenCalledWith(initialState, action1);
            expect(handler2).not.toHaveBeenCalled();
            expect(reducer(undefined, action2)).toBe("newState2");
            expect(handler2).toHaveBeenCalledWith(initialState, action2);
        });

        it("ignores unhandled actions", () => {
            const handler1 = jest.fn();
            const reducer = mapReducers(initialState, (handle) => [handle(actionCreator1, handler1)]);
            expect(reducer(undefined, action2)).toBe(initialState);
            expect(handler1).not.toHaveBeenCalled();
        });
    });

    describe("with state!=undefined", () => {
        it("passes the state to the handler and returns the value returned by the handler", () => {
            const handler1 = jest.fn().mockReturnValueOnce("newState1");
            const handler2 = jest.fn().mockReturnValueOnce("newState2");
            const reducer = mapReducers(initialState, (handle) => [
                handle(actionCreator1, handler1),
                handle(actionCreator2, handler2),
            ]);
            expect(reducer("oldState1" as any, action1)).toBe("newState1");
            expect(handler1).toHaveBeenCalledWith("oldState1", action1);
            expect(handler2).not.toHaveBeenCalled();
            expect(reducer("oldState2" as any, action2)).toBe("newState2");
            expect(handler2).toHaveBeenCalledWith("oldState2", action2);
        });

        it("ignores unhandled actions", () => {
            const handler1 = jest.fn();
            const reducer = mapReducers(initialState, (handle) => [handle(actionCreator1, handler1)]);
            expect(reducer("oldState" as any, action2)).toBe("oldState");
            expect(handler1).not.toHaveBeenCalled();
        });
    });
});
