import {
  AUDIO_TRANSCRIPT_RESTART_INTERVAL,
  STREAMING_RECOGNITION_CONFIG,
  SONG_MATCHER_WINDOW_SIZE,
  MXM_DATASET_PATH,
  STREAMING_URL
} from '../settings'

import {
  createRedisDatabase,
  createSqliteDatabase
} from '../databases'

import {
  createAudioTranscriptorPipeline,
  createSongMatcherPipeline
} from './pipelines'

export const createSongMatcherJob = () => {
  let audioTranscriptor = null

  const songMatcher = createSongMatcherPipeline({
    windowSize: SONG_MATCHER_WINDOW_SIZE,
    database: createSqliteDatabase(MXM_DATASET_PATH),
    cache: createRedisDatabase()
  })

  const transcriptCallback = (chunk) => {
    songMatcher.write(chunk)
  }

  const startAudioTranscriptor = () => {
    audioTranscriptor = createAudioTranscriptorPipeline({
      streamingUrl: STREAMING_URL,
      config: STREAMING_RECOGNITION_CONFIG
    }).on('data', transcriptCallback)
  }

  startAudioTranscriptor()
  setInterval(() => {
    if (audioTranscriptor) {
      audioTranscriptor.end()
      audioTranscriptor.removeListener('data', transcriptCallback)
      audioTranscriptor = null
    }
    startAudioTranscriptor()
  }, AUDIO_TRANSCRIPT_RESTART_INTERVAL)

  return songMatcher
}
