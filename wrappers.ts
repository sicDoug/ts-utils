// wrappers.ts
//
// TypeScript implementation of wrappers inspired by (but not identical to)
// some Enums found in functional programming languages.
//
// The goal of this little library is to provide a protective layer to
// ensure that one is never unexplicitly working with null, unidentified
// or errors and always have a safe and idiomatic way to return results.
//
// The classes and method have different names than they do in Rust, for
// example. This is partly to avoid shadowing built-in classes and methods
// in JS, but mainly to work as a reminder that they do not necessarily
// behave exactly like their functional language counterparts.
//
// The `Outcome` wrapper consists of both a `Success` and `Failure` class,
// each of which can hold a value. The `Envelope` wrapper consists of
// `Something` and `Nothing`, of which only `Something` can hold a value.
//
// The `unpack()` method retrives the value end ensures that it belongs to a
// "positive" result, and will throw an exception before ever returning an
// unexpected result. This is only ever meant to be used after it has been
// made explicitly clear that the instance is a "positive" one.
//
// The `unmask()` method works the same way for retriving the error values.
// It too will throw an execption if used by mistake on an unintended instance.
//
// Both types have mirrored checkers in each class, for example the `success()`
// method in both instances of `Outcome`. They also have their respective
// inversions, for example the `Success` instance have both a `success()` method
// and a `failure()` method. This is to allow for the clearest semantic flow
// when applied in real life code.

const NO_VALUE = Symbol('No Value');

export type Outcome<T, E> = Success<T> | Failure<E>;

export class Success<T = typeof NO_VALUE> {
    private readonly _value: T | typeof NO_VALUE = NO_VALUE;

    constructor(value: T | typeof NO_VALUE = NO_VALUE) {
        this._value = value;
    }

    unpack(): T {
        if (this._value !== NO_VALUE) {
            return this._value;
        } else {
            throw new Error("Called `unpack()` on an intance of `Success` which has no value");
        }
    }

    unmask(): never {
        throw new Error("Called `unmask()` on an instance of `Success`");
    }

    success(): boolean {
        return true;
    }

    failure(): boolean {
        return false;
    }
}

export class Failure<E = typeof NO_VALUE> {
    private readonly _value: E | typeof NO_VALUE = NO_VALUE;

    constructor(value: E | typeof NO_VALUE = NO_VALUE) {
        this._value = value;
    }

    unpack(): never {
        throw new Error("Called `unpack()` on an instance of `Failure`");
    }

    unmask(): E {
        if (this._value !== NO_VALUE) {
            return this._value;
        } else {
            throw new Error("Called `unmask()` on an instace of `Failure` which has no value");
        }
    }

    success(): boolean {
        return false;
    }

    failure(): boolean {
        return true;
    }
}

export type Envelope<T> = Something<T> | Nothing;

export class Something<T> {
    private readonly _value: T;

    constructor(value: T) {
        this._value = value;
    }

    unpack(): T {
        return this._value;
    }

    something(): boolean {
        return true;
    }

    nothing(): boolean {
        return false;
    }
}

export class Nothing {
    unpack(): never {
        throw new Error("Called `unpack()` on an instance of `Nothing`");
    }

    something(): boolean {
        return false;
    }

    nothing(): boolean {
        return true;
    }
}
