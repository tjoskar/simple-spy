'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function spy(fn = () => undefined) {
    const stub = function (...args) {
        stub.callCount++;
        stub.args.push(args);
        return fn(...args);
    };

    stub.reset = () => {
        stub.callCount = 0;
        stub.args = [];
    };

    stub.reset();

    Object.defineProperty(stub, 'length', {value: fn.length});

    return stub;
}

exports.spy = spy;
