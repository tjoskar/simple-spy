type Fn<Args extends any[], RetVal> = (...args: Args) => RetVal

export type SpyReturn<Args extends any[], RetVal> = Fn<Args, RetVal> & {
  callCount: number
  args: Args[]
  reset(): void
}

const noop = (): undefined => undefined

export function spy<Args extends any[], RetVal> (fn?: Fn<Args, RetVal>): SpyReturn<Args, RetVal | undefined> {
  const spyReturn: SpyReturn<Args, RetVal | undefined> = Object.assign(
    function (...args: Args): RetVal | ReturnType<typeof noop> {
      spyReturn.callCount++
      spyReturn.args.push(args)
      return fn ? fn(...args) : noop()
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

  Object.defineProperty(spyReturn, 'length', { value: (fn || noop).length })

  return spyReturn
}
