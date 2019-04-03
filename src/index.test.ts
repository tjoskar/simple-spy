import test from 'ava'
import { spy } from './'

test('should call the original function', (t): void => {
  // Arrange
  let called = false
  const fun = (): void => { called = true }
  const funSpy = spy(fun)

  // Act
  funSpy()

  // Assert
  t.is(called, true)
})

test('should return original', (t): void => {
  const expected = Symbol('return value')
  const fun = (): Symbol => expected
  const funSpy = spy(fun)
  const actual = funSpy()
  t.is(actual, expected)
})

test('should call the original function with arguments', (t): void => {
  // Arrange
  let myNumber = 0
  const fun = (newNumber: number): void => { myNumber = newNumber }
  const funSpy = spy(fun)

  // Act
  funSpy(5)

  // Assert
  t.is(myNumber, 5)
})

test('call count should be zero at the beginning', (t): void => {
  // Arrange
  const fun = (): void => {}

  // Act
  const funSpy = spy(fun)

  // Assert
  t.is(funSpy.callCount, 0)
})

test('should increase for every call', (t): void => {
  // Arrange
  const fun = (): void => {}
  const funSpy = spy(fun)

  // Act
  funSpy()
  funSpy()
  funSpy()

  // Assert
  t.is(funSpy.callCount, 3)
})

test('Argument list should be empty at the beginning', (t): void => {
  // Arrange
  const fun = (): void => {}

  // Act
  const funSpy = spy(fun)

  // Assert
  t.is(funSpy.args.length, 0)
})

test('Should save args for every call', (t): void => {
  // Arrange
  const fun = (n: number): void => {} // eslint-disable-line @typescript-eslint/no-unused-vars
  const funSpy = spy(fun)

  // Act
  funSpy(1)
  funSpy(2)
  funSpy(5)

  // Assert
  t.is(funSpy.args.length, 3)
  t.is(funSpy.args[0].length, 1)
  t.is(funSpy.args[0][0], 1)
  t.is(funSpy.args[1].length, 1)
  t.is(funSpy.args[1][0], 2)
  t.is(funSpy.args[2].length, 1)
  t.is(funSpy.args[2][0], 5)
})

test('reset should reset arguments list', (t): void => {
  const fun = (arg: string | number): void => {} // eslint-disable-line @typescript-eslint/no-unused-vars
  const funSpy = spy(fun)

  t.is(funSpy.callCount, 0)
  t.is(funSpy.args.length, 0)

  funSpy('Hello Dexter Morgan')

  t.is(funSpy.callCount, 1)
  t.is(funSpy.args.length, 1)
  t.is(funSpy.args[0][0], 'Hello Dexter Morgan')

  funSpy.reset()

  funSpy('Set phasers to stun')

  t.is(funSpy.callCount, 1)
  t.is(funSpy.args.length, 1)
  t.is(funSpy.args[0].length, 1)
  t.is(funSpy.args[0][0], 'Set phasers to stun')
})

test('real function and stub have same length (arity)', (t): void => {
  const fun3 = (a: null, b: null, c: null): void => {} // eslint-disable-line @typescript-eslint/no-unused-vars
  const funSpy3 = spy(fun3)

  t.is(funSpy3.length, 3)

  const fun11 = (a: null, b: null, c: null, d: null, e: null, f: null): void => {} // eslint-disable-line @typescript-eslint/no-unused-vars
  const funSpy11 = spy(fun11)

  t.is(funSpy11.length, 6)
})

test('can be used as constructor', (t): void => {
  const ctorSpy = spy((): void => {})
  t.notThrows((): void => { new (ctorSpy as any)() }) // eslint-disable-line no-new
})

test('support creating a spy without a function', (t): void => {
  // Arrange
  const funSpy = spy()

  // Act
  const ret = funSpy()

  // Assert
  t.is(funSpy.callCount, 1)
  t.is(ret, undefined)
})

test('supports multiple parameters of different types', (t): void => {
  const fun = (s: string, n: number): void => {} // eslint-disable-line @typescript-eslint/no-unused-vars
  const funSpy = spy(fun)
  funSpy('Don\'t panic', 42)
  t.is(funSpy.args[0][0], 'Don\'t panic')
  t.is(funSpy.args[0][1], 42)
})
