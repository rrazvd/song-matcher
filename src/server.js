import express from 'express'
import { SERVER_PORT, MXM_DATASET_PATH } from './settings'
import { createSongMatcherPipeline } from './job'
import { createSqliteDatabase } from './databases'

const app = express()

app.listen(SERVER_PORT, () => {
  console.log(`Song matcher listening on port ${SERVER_PORT}`)
})

const database = createSqliteDatabase(MXM_DATASET_PATH)
const songMatcherPipeline = createSongMatcherPipeline(database)

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })
  songMatcherPipeline.pipe(res)
})
