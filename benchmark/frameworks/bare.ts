import { createServer } from 'node:http'

const server = createServer((_req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})

server.listen(3000)
