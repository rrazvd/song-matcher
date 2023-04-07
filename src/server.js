import express from 'express'

import {
  SERVER_PORT,
  STREAMING_URL,
  MXM_DATASET_PATH,
  STREAMING_RECOGNITION_CONFIG,
  SONG_MATCHER_WINDOW_SIZE
} from './settings'

import { createSongMatcherPipeline } from './job'
import { createSqliteDatabase } from './databases'

const app = express()

app.listen(SERVER_PORT, () => {
  console.log(`Song matcher listening on port ${SERVER_PORT}`)
})

const songMatcherPipeline = createSongMatcherPipeline({
  database: createSqliteDatabase(MXM_DATASET_PATH),
  streamingUrl: STREAMING_URL,
  transcriptorConfig: STREAMING_RECOGNITION_CONFIG,
  songMatcherWindowSize: SONG_MATCHER_WINDOW_SIZE
})

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })
  songMatcherPipeline.pipe(res)
})
