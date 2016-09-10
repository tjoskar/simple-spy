declare module 'simple-spy' {
  interface SpyReturn extends Function {
    callCount: number;
    args: Array<Array<any>>;
    reset(): void;
  }
  export function spy(Function): SpyReturn;
}
