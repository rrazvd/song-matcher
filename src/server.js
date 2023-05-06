import express from 'express'

import { createSongMatcherJob } from './job'

import { SERVER_PORT } from './settings'

const songMatcher = createSongMatcherJob()

const app = express()

app.listen(SERVER_PORT, () => {
  console.log(`Song matcher listening on port ${SERVER_PORT}`)
})

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })

  songMatcher.on('data', (data) => res.write(`data: ${JSON.stringify({ timestamp: Date.now(), ranking: data })}\n\n`))
})
