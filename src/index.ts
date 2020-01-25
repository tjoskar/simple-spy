type Fn<Args extends any[], RetVal> = (...args: Args) => RetVal

export type SpyReturn<Args extends any[], RetVal> = Fn<Args, RetVal> & {
  callCount: number
  args: Args[]
  reset(): void
}

const noop = (): void => {} // eslint-disable-line @typescript-eslint/no-empty-function

function spy<Args extends any[]> (): SpyReturn<Args, void>
function spy<Args extends any[], RetVal> (fn: Fn<Args, RetVal>): SpyReturn<Args, RetVal>
function spy<Args extends any[], RetVal> (
  fn: Fn<Args, void | RetVal> = noop
): SpyReturn<Args, void | RetVal> {
  const spyReturn: SpyReturn<Args, void | RetVal> = Object.assign(
    function (...args: Args): void | RetVal {
      spyReturn.callCount++
      spyReturn.args.push(args)
      return fn(...args)
    },
    {
      callCount: 0,
      args: [] as Args[],
      reset: (): void => {
        spyReturn.callCount = 0
        spyReturn.args = [] as Args[]
      }
    }
  )

  Object.defineProperty(spyReturn, 'length', { value: fn.length })

  return spyReturn
}

export { spy }
