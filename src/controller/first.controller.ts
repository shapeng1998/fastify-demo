import type { FastifyReply, FastifyRequest } from 'fastify'
import { Controller, GET, Hook } from 'fastify-decorators'

@Controller()
export default class FirstController {
  @Hook('onSend')
  async onSend(_request: FastifyRequest, reply: FastifyReply) {
    reply.header('access-control-allow-origin', 'https://m.baidu.com')
  }

  @GET()
  async helloHandler() {
    return { hello: 'world' }
  }
}
