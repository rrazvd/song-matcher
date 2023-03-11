import express from 'express'
import { SERVER_PORT } from './settings'
import { getSongMatcherStream } from './job'

const app = express()

app.listen(SERVER_PORT, () => {
  console.log(`Song matcher listening on port ${SERVER_PORT}`)
})

const songMatcherStream = getSongMatcherStream()

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })
  songMatcherStream.pipe(res)
})
