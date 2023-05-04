import express from 'express'

import { createSongMatcherPipeline, createAudioTranscriptorPipeline } from './job'
import { createRedisDatabase, createSqliteDatabase } from './databases'

import {
  SERVER_PORT,
  STREAMING_URL,
  MXM_DATASET_PATH,
  STREAMING_RECOGNITION_CONFIG,
  SONG_MATCHER_WINDOW_SIZE,
  AUDIO_TRANSCRIPT_RESTART_INTERVAL
} from './settings'

let audioTranscriptor = null

const songMatcherPipeline = createSongMatcherPipeline({
  songMatcherWindowSize: SONG_MATCHER_WINDOW_SIZE,
  database: createSqliteDatabase(MXM_DATASET_PATH),
  cache: createRedisDatabase()
})

const speechCallback = (stream) => {
  songMatcherPipeline.write(stream)
}

const startAudioTranscript = () => {
  audioTranscriptor = createAudioTranscriptorPipeline({
    streamingUrl: STREAMING_URL,
    transcriptorConfig: STREAMING_RECOGNITION_CONFIG
  }).on('data', speechCallback)
}

startAudioTranscript()
setInterval(
  () => {
    if (audioTranscriptor) {
      audioTranscriptor.end()
      audioTranscriptor.removeListener('data', speechCallback)
      audioTranscriptor = null
    }
    startAudioTranscript()
  },
  AUDIO_TRANSCRIPT_RESTART_INTERVAL
)

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
  songMatcherPipeline.on('data', (data) => res.write(data))
})
