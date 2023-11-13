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
    unpackOr(defaultValue: T): T {
        if (this._value !== NO_VALUE) {
            return this._value;
        } else {
            return defaultValue;
        }
    }
    unmask(): never {
        throw new Error("Called `unmask()` on an instance of `Success`");
    }
    isSuccess(): boolean {
        return true;
    }
    isFailure(): boolean {
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
    unpackOr<T>(defaultValue: T): T {
        return defaultValue;
    }
    unmask(): E {
        if (this._value !== NO_VALUE) {
            return this._value;
        } else {
            throw new Error("Called `unmask()` on an instace of `Failure` which has no value");
        }
    }
    isSuccess(): boolean {
        return false;
    }
    isFailure(): boolean {
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
    unpackOr(_value: T): T {
        return this._value;
    }
    isSomething(): boolean {
        return true;
    }
    isNothing(): boolean {
        return false;
    }
}

export class Nothing {
    unpack(): never {
        throw new Error("Called `unpack()` on an instance of `Nothing`");
    }
    unpackOr<T>(defaultValue: T): T {
        return defaultValue;
    }
    isSomething(): boolean {
        return false;
    }
    isNothing(): boolean {
        return true;
    }
}
