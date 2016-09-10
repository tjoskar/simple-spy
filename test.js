import test from 'ava';
import { spy } from './';

test('should call the original function', t => {
    // Arrange
    let called = false;
    const fun = () => called = true;
    const funSpy = spy(fun);

    // Act
    funSpy();

    // Assert
    t.is(called, true);
});

test('should call the original function with arguments', t => {
    // Arrange
    let myNumber = 0;
    const fun = newNumber => myNumber = newNumber;
    const funSpy = spy(fun);

    // Act
    funSpy(5);

    // Assert
    t.is(myNumber, 5);
});

test('call count should be zero at the beginning', t => {
    // Arrange
    const fun = () => {};

    // Act
    const funSpy = spy(fun);

    // Assert
    t.is(funSpy.callCount, 0);
});

test('should increase for every call', t => {
    // Arrange
    const fun = () => {};
    const funSpy = spy(fun);

    // Act
    funSpy();
    funSpy();
    funSpy();

    // Assert
    t.is(funSpy.callCount, 3);
});

test('Argument list should be empty at the beginning', t => {
    // Arrange
    const fun = () => {};

    // Act
    const funSpy = spy(fun);

    // Assert
    t.is(funSpy.args.length, 0);
});

test('Should save args for every call', t => {
    // Arrange
    const fun = () => {};
    const funSpy = spy(fun);

    // Act
    funSpy(1);
    funSpy(2, 3);
    funSpy(5);

    // Assert
    t.is(funSpy.args.length, 3);
    t.is(funSpy.args[0].length, 1);
    t.is(funSpy.args[0][0], 1);
    t.is(funSpy.args[1].length, 2);
    t.is(funSpy.args[1][0], 2);
    t.is(funSpy.args[1][1], 3);
    t.is(funSpy.args[2].length, 1);
    t.is(funSpy.args[2][0], 5);
});

test('reset should reset arguments list', t => {
    const fun = () => {};
    const funSpy = spy(fun);

    t.is(funSpy.callCount, 0);
    t.is(funSpy.args.length, 0);

    funSpy('Hello Dexter Morgan');

    t.is(funSpy.callCount, 1);
    t.is(funSpy.args.length, 1);
    t.is(funSpy.args[0][0], 'Hello Dexter Morgan');

    funSpy.reset();

    funSpy(1, 2, 3);

    t.is(funSpy.callCount, 1);
    t.is(funSpy.args.length, 1);
    t.is(funSpy.args[0].length, 3);
    t.is(funSpy.args[0][0], 1);
    t.is(funSpy.args[0][1], 2);
    t.is(funSpy.args[0][2], 3);
});
