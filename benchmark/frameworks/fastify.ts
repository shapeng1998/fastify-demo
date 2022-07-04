import type { RouteShorthandOptions } from 'fastify'
import Fastify from 'fastify'

const fastify = Fastify()

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string',
          },
        },
      },
    },
  },
}

fastify.get('/', opts, async () => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    process.exit(1)
  }
}

start()
