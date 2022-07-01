import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify'

const opts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['hello'],
      properties: {
        hello: { type: 'number' },
      },
    },
  },
}

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { hello: 'world' }
  })

  fastify.post('/', opts, async () => {
    return { hello: 'world' }
  })
}
