# simple-spy [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> yet another spy library

Spy library for unit testing


## Install

```sh
$ npm install --save simple-spy
```


## Usage

```js
import {spy} from 'simple-spy';

let fun = (...args) => console.log(...args);
let funSpy = spy(fun);

console.assert(funSpy.callCount === 0);
console.assert(funSpy.args.length === 0);

funSpy('Hello Dexter Morgan'); // Output:  Hello Dexter Morgan

console.assert(funSpy.callCount === 1);
console.assert(funSpy.args.length === 1);
console.assert(funSpy.args[0][0] === 'Hello Dexter Morgan');

funSpy.reset();

funSpy(1, 2, 3); // Output:  1 2 3

console.assert(funSpy.callCount === 1);
console.assert(funSpy.args.length === 1);
console.assert(funSpy.args[0].length === 3);
console.assert(funSpy.args[0][0] === 1);
console.assert(funSpy.args[0][1] === 2);
console.assert(funSpy.args[0][2] === 3);
```

## License

MIT © [Oskar Karlsson](oskarkarlsson.nu)


[npm-image]: https://badge.fury.io/js/simple-spy.svg
[npm-url]: https://npmjs.org/package/simple-spy
[travis-image]: https://travis-ci.org/tjoskar/simple-spy.svg?branch=master
[travis-url]: https://travis-ci.org/tjoskar/simple-spy
[daviddm-image]: https://david-dm.org/tjoskar/simple-spy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tjoskar/simple-spy
[coveralls-image]: https://coveralls.io/repos/tjoskar/simple-spy/badge.svg
[coveralls-url]: https://coveralls.io/r/tjoskar/simple-spy
