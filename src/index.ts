export interface SpyReturn extends Function {
    callCount: number
    args: Array<Array<any>>
    reset(): void
};

export function spy(fn: any) {
    const spyReturn: SpyReturn = Object.assign(
        function (...args: any[]) {
            spyReturn.callCount++;
            spyReturn.args.push(args);
            return fn(...args);
        },
        {
            callCount: 0,
            args: [],
            reset: () => {
                spyReturn.callCount = 0;
                spyReturn.args = [];
            }
        }
    );

    Object.defineProperty(spyReturn, 'length', {value: fn.length});

    return spyReturn;
}
