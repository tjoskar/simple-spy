type Fn<Args extends any[], RetVal> = (...args: Args) => RetVal

export type SpyReturn<Args extends any[], RetVal> = Fn<Args, RetVal> & {
  callCount: number
  args: Args[]
  reset: () => void
}

const noop = (): undefined => undefined

function spy<Args extends any[]> (): SpyReturn<Args, void>
function spy<Args extends any[], RetVal> (fn: Fn<Args, RetVal>): SpyReturn<Args, RetVal>
function spy<Args extends any[], RetVal> (
  fn: Fn<Args, undefined | RetVal> = noop
): SpyReturn<Args, undefined | RetVal> {
  const spyReturn: SpyReturn<Args, undefined | RetVal> = Object.assign(
    function (...args: Args): undefined | RetVal {
      spyReturn.callCount++
      spyReturn.args.push(args)
      return fn(...args)
    },
    {
      callCount: 0,
      args: [],
      reset: (): void => {
        spyReturn.callCount = 0
        spyReturn.args = []
      }
    }
  )

  Object.defineProperty(spyReturn, 'length', { value: fn.length })

  return spyReturn
}

export { spy }
