function spy(fn) {
  let stub = (...args) => {
    stub.callCount++;
    stub.args.push(args);
    return fn(...args);
  };

  stub.reset = () => {
    stub.callCount = 0;
    stub.args = [];
  };

  stub.reset();

  return stub;
}

export {spy};
export default spy;
