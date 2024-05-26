import { actionCreator } from "./actionCreator";

const ACTION = "hello/world";

describe("actionCreator", () => {
    describe("without payload and without meta", () => {
        const myAction = actionCreator(ACTION);

        it("should have the type set correctly", () => {
            expect(myAction.type).toBe(ACTION);
        });

        it("should create an action with only the type set", () => {
            const action = myAction();
            expect(Object.keys(action)).toEqual(["type"]);
            expect(action.type).toBe(ACTION);
        });
    });
    describe("with payload, but without meta", () => {
        const myAction = actionCreator(ACTION, (foo: string, bar: number) => ({ foo, bar }));

        it("should have the type set correctly", () => {
            expect(myAction.type).toBe(ACTION);
        });

        it("should create an action with only the type and payload set", () => {
            const action = myAction("ultimate answer", 42);
            expect(Object.keys(action).sort()).toEqual(["payload", "type"]);
            expect(action.type).toBe(ACTION);
            expect(action.payload).toEqual({
                foo: "ultimate answer",
                bar: 42,
            });
        });
    });
    describe("without payload, but with meta", () => {
        const myAction = actionCreator(ACTION, undefined, (foo: string, bar: number) => ({ foo, bar }));

        it("should have the type set correctly", () => {
            expect(myAction.type).toBe(ACTION);
        });

        it("should create an action with only the type and meta set", () => {
            const action = myAction("ultimate answer", 42);
            expect(Object.keys(action).sort()).toEqual(["meta", "type"]);
            expect(action.type).toBe(ACTION);
            expect(action.meta).toEqual({
                foo: "ultimate answer",
                bar: 42,
            });
        });
    });

    describe("with payload and meta", () => {
        const myAction = actionCreator(
            ACTION,
            (hello: string, world: number) => ({ hello, world }),
            (foo: string, bar: number) => ({ foo, bar }),
        );

        it("should have the type set correctly", () => {
            expect(myAction.type).toBe(ACTION);
        });

        it("should create an action with type, payload and meta set", () => {
            const action = myAction("ultimate answer", 42);
            expect(Object.keys(action).sort()).toEqual(["meta", "payload", "type"]);
            expect(action.type).toBe(ACTION);
            expect(action.payload).toEqual({
                hello: "ultimate answer",
                world: 42,
            });
            expect(action.meta).toEqual({
                foo: "ultimate answer",
                bar: 42,
            });
        });
    });
});
