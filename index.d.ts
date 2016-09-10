export interface SpyReturn extends Function {
    callCount: number;
    args: Array<Array<any>>;
    reset(): void;
}
export declare function spy(fn: any): SpyReturn;
