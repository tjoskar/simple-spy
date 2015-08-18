/// <reference path="./simple-spy.d.ts"/>
import {spy} from 'simple-spy'

let fun = () => {};
let k = spy(fun);
console.log(k.callCount);
console.log(k.args[0][0].k);
k();
