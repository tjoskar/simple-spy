import assert from 'assert';
import spy from '../lib';

describe('simple-spy', () => {

  describe('Make the ordanary function call', () => {

    it('should call the orginal function', () => {
      // Setup
      let called = false;
      let fun = () => called = true;
      let funSpy = spy(fun);

      // Test
      funSpy();

      // Assert
      assert(called === true);
    });

    it('should call the orginal function with arguments', () => {
      // Setup
      let myNumber = 0;
      let fun = newNumber => myNumber = newNumber;
      let funSpy = spy(fun);

      // Test
      funSpy(5);

      // Assert
      assert(myNumber === 5);
    });

  });

  describe('Call count', () => {

    it('Call count should be zero at the begining', () => {
      // Setup
      let fun = () => {};

      // Test
      let funSpy = spy(fun);

      // Assert
      assert(funSpy.callCount === 0);
    });

    it('Should increase for evry call', () => {
      // Setup
      let fun = () => {};
      let funSpy = spy(fun);

      // Test
      funSpy();
      funSpy();
      funSpy();

      // Assert
      assert(funSpy.callCount === 3);
    });

  });

  describe('Argument spy', () => {

    it('Argument list should be emty at the begining', () => {
      // Setup
      let fun = () => {};

      // Test
      let funSpy = spy(fun);

      // Assert
      assert(funSpy.args.length === 0);
    });

    it('Should save args for evry call', () => {
      // Setup
      let fun = () => {};
      let funSpy = spy(fun);

      // Test
      funSpy(1);
      funSpy(2, 3);
      funSpy(5);

      // Assert
      assert(funSpy.args.length === 3);
      assert(funSpy.args[0].length === 1);
      assert(funSpy.args[0][0] === 1);
      assert(funSpy.args[1].length === 2);
      assert(funSpy.args[1][0] === 2);
      assert(funSpy.args[1][1] === 3);
      assert(funSpy.args[2].length === 1);
      assert(funSpy.args[2][0] === 5);
    });

    it('reset should reset arguments', () => {
      let fun = () => {};
      let funSpy = spy(fun);

      assert(funSpy.callCount === 0);
      assert(funSpy.args.length === 0);

      funSpy('Hello Dexter Morgan');

      assert(funSpy.callCount === 1);
      assert(funSpy.args.length === 1);
      assert(funSpy.args[0][0] === 'Hello Dexter Morgan');

      funSpy.reset();

      funSpy(1, 2, 3);

      assert(funSpy.callCount === 1);
      assert(funSpy.args.length === 1);
      assert(funSpy.args[0].length === 3);
      assert(funSpy.args[0][0] === 1);
      assert(funSpy.args[0][1] === 2);
      assert(funSpy.args[0][2] === 3);
    });

  });
});
