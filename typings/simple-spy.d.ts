declare module 'simple-spy' {
  interface spyReturn extends Function {
      callCount: number;
      args: Array<Array<any>>;
  }
  export function spy(Function): spyReturn;
}
