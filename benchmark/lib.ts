import type { Options, Result } from 'autocannon'
import autocannon from 'autocannon'

export const run = (opts: Options = {} as Options) => {
  return new Promise<Result>((resolve, reject) => {
    autocannon(opts, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
