declare module 'simple-spy' {
  interface spyReturn extends Function {
      callCount: number;
      args: Array<Array<any>>;
      reset(): void;
  }
  export function spy(Function): spyReturn;
}
