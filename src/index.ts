export interface SpyReturn extends Function {
  callCount: number
  args: Array<Array<any>>
  reset(): void
};

const noop = (): undefined => undefined

export function spy (fn: any = noop): SpyReturn {
  const spyReturn: SpyReturn = Object.assign(
    function (...args: any[]): any {
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

  Object.defineProperty(spyReturn, 'length', {value: fn.length})

  return spyReturn
}
