type Fn<Args extends any[], R> = (...args: Args) => R;

export type SpyReturn<Args extends any[], R> = Fn<Args, R> & {
	callCount: number;
	args: Args[];
	reset: () => void;
};

const noop = (): undefined => undefined;

function spy<Args extends any[]>(): SpyReturn<Args, void>;
function spy<Args extends any[], ReturnValueValue>(fn: Fn<Args, ReturnValueValue>): SpyReturn<Args, ReturnValueValue>;
function spy<Args extends any[], ReturnValueValue>(
	fn: Fn<Args, undefined | ReturnValueValue> = noop,
): SpyReturn<Args, undefined | ReturnValueValue> {
	const spyReturn: SpyReturn<Args, undefined | ReturnValueValue> = Object.assign(
		(...args: Args): undefined | ReturnValueValue => {
			spyReturn.callCount++;
			spyReturn.args.push(args);
			return fn(...args);
		},
		{
			callCount: 0,
			args: [],
			reset(): void {
				spyReturn.callCount = 0;
				spyReturn.args = [];
			},
		},
	);

	Object.defineProperty(spyReturn, 'length', {value: fn.length});

	return spyReturn;
}

export {spy};
