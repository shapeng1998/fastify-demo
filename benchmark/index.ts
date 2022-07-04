import { benchSingleFramework } from './lib'

const frameworkList = ['bare', 'express', 'fastify']

const main = async () => {
  for (const handler of frameworkList) {
    try {
      await benchSingleFramework(handler)
    } catch (e) {
      console.log(e)
    }
  }
}

main()
