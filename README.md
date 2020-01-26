# simple-spy [![Coverage Status](https://coveralls.io/repos/github/tjoskar/simple-spy/badge.svg?branch=master)](https://coveralls.io/github/tjoskar/simple-spy?branch=master)

> yet another spy library


## Install

```
$ npm install --save simple-spy
```


## Usage

```js
import { spy } from 'simple-spy'

const fun = (...args) => console.log(...args)
const funSpy = spy(fun)

assert(funSpy.callCount === 0)
assert(funSpy.args.length === 0)

funSpy('Hello Dexter Morgan') // Output:  Hello Dexter Morgan

assert(funSpy.callCount === 1)
assert(funSpy.args.length === 1)
assert(funSpy.args[0][0] === 'Hello Dexter Morgan')

funSpy.reset()

funSpy(1, 2, 3) // Output:  1 2 3

assert(funSpy.callCount === 1)
assert(funSpy.args.length === 1)
assert(funSpy.args[0].length === 3)
assert(funSpy.args[0][0] === 1)
assert(funSpy.args[0][1] === 2)
assert(funSpy.args[0][2] === 3)
```


## API

### spy(fun)

#### fun

Type: `function`


## License

MIT © [Oskar Karlsson](http://oskarkarlsson.nu)
