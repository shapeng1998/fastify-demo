import type { FastifyPluginAsync } from 'fastify'

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { hello: 'world' }
  })
}
