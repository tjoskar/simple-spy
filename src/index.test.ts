/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable max-params */

import {strictEqual as equal} from 'node:assert';
import {test} from 'node:test';
import {spy} from './index.js';

test('should call the original function', (): void => {
	// Arrange
	let called = false;
	const fun = (): void => {
		called = true;
	};

	const funSpy = spy(fun);

	// Act
	funSpy();

	// Assert
	equal(called, true);
});

test('should call the original function', (): void => {
	// Arrange
	let called = false;
	const fun = (): void => {
		called = true;
	};

	const funSpy = spy(fun);

	// Act
	funSpy();

	// Assert
	equal(called, true);
});

test('should return original', (): void => {
	const expected = Symbol('return value');
	const fun = (): symbol => expected;
	const funSpy = spy(fun);
	const actual = funSpy();
	equal(actual, expected);
});

test('should call the original function with arguments', (): void => {
	// Arrange
	let myNumber = 0;
	const fun = (newNumber: number): void => {
		myNumber = newNumber;
	};

	const funSpy = spy(fun);

	// Act
	funSpy(5);

	// Assert
	equal(myNumber, 5);
});

test('call count should be zero at the beginning', (): void => {
	// Arrange
	const fun = (): undefined => undefined;

	// Act
	const funSpy = spy(fun);

	// Assert
	equal(funSpy.callCount, 0);
});

test('should increase for every call', (): void => {
	// Arrange
	const fun = (): undefined => undefined;
	const funSpy = spy(fun);

	// Act
	funSpy();
	funSpy();
	funSpy();

	// Assert
	equal(funSpy.callCount, 3);
});

test('Argument list should be empty at the beginning', (): void => {
	// Arrange
	const fun = (): undefined => undefined;

	// Act
	const funSpy = spy(fun);

	// Assert
	equal(funSpy.args.length, 0);
});

test('Should save args for every call', (): void => {
	// Arrange
	const fun = (n: number): undefined => undefined;
	const funSpy = spy(fun);

	// Act
	funSpy(1);
	funSpy(2);
	funSpy(5);

	// Assert
	equal(funSpy.args.length, 3);
	equal(funSpy.args[0].length, 1);
	equal(funSpy.args[0][0], 1);
	equal(funSpy.args[1].length, 1);
	equal(funSpy.args[1][0], 2);
	equal(funSpy.args[2].length, 1);
	equal(funSpy.args[2][0], 5);
});

test('reset should reset arguments list', (t): void => {
	const fun = (arg: string | number): void => {};
	const funSpy = spy(fun);

	equal(funSpy.callCount, 0);
	equal(funSpy.args.length, 0);

	funSpy('Hello Dexter Morgan');

	equal(funSpy.callCount, 1);
	equal(funSpy.args.length, 1);
	equal(funSpy.args[0][0], 'Hello Dexter Morgan');

	funSpy.reset();

	funSpy('Set phasers to stun');

	equal(funSpy.callCount, 1);
	equal(funSpy.args.length, 1);
	equal(funSpy.args[0].length, 1);
	equal(funSpy.args[0][0], 'Set phasers to stun');
});

test('real function and stub have same length (arity)', (t): void => {
	const fun3 = (a: undefined, b: undefined, c: undefined): void => {};
	const funSpy3 = spy(fun3);

	equal(funSpy3.length, 3);

	const fun11 = (
		a: undefined,
		b: undefined,
		c: undefined,
		d: undefined,
		// No `e` due to lint rule
		f: undefined,
		g: undefined,
	): void => {};

	const funSpy11 = spy(fun11);

	equal(funSpy11.length, 6);
});

test('support creating a spy without a function', (t): void => {
	// Arrange
	const funSpy = spy();

	// Act
	const returnValue = funSpy();

	// Assert
	equal(funSpy.callCount, 1);
	equal(returnValue, undefined);
});

test('supports multiple parameters of different types', (t): void => {
	const fun = (s: string, n: number): void => {};
	const funSpy = spy(fun);
	funSpy('Don\'t panic', 42);
	equal(funSpy.args[0][0], 'Don\'t panic');
	equal(funSpy.args[0][1], 42);
});
