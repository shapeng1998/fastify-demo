import Fastify from 'fastify'
import { bootstrap } from 'fastify-decorators'

const fastify = Fastify({ logger: true })

fastify.register(bootstrap, {
  directory: new URL('controller', import.meta.url),
  mask: /\.controller\./,
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
