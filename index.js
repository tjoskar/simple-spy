'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function spy(fn) {
    const inner = (...args) => {
        stub.callCount++;
        stub.args.push(args);
        return fn(...args);
    };

    // ends up a string like
    // 'a,b,c,d'
    // depending on the `fn.length`
    const stubArgs = Array(fn.length)
        .fill(null)
        .map((m, i) => String.fromCodePoint(97 + i))
        .join();

    const stubBody = 'return inner(...arguments);';

    // this seems to be the only way
    // to create a function with
    // programmatically specified arity
    const stub = eval(
        // the wrapping parens is to
        // prevent it from evaluating as
        // a function declaration
        `(function (${stubArgs}) { ${stubBody} })`
    );

    stub.reset = () => {
        stub.callCount = 0;
        stub.args = [];
    };

    stub.reset();

    return stub;
}

exports.spy = spy;
