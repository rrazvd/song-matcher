const {
  SERVER_PORT = 3000,
  STREAMING_URL = '',
  LANGUAGE_CODE = 'pt-BR',
  SONG_MATCHER_WINDOW_SIZE = 30,
  STREAM_SAMPLE_RATE_HERTZ = 48000,
  AUDIO_TRANSCRIPT_RESTART_INTERVAL = 300 * 1000
} = process.env

const STREAMING_RECOGNITION_CONFIG = {
  config: {
    encoding: 'FLAC',
    model: 'latest_long',
    audioChannelCount: 1,
    languageCode: LANGUAGE_CODE,
    sampleRateHertz: STREAM_SAMPLE_RATE_HERTZ
  },
  interimResults: true
}

const MXM_DATASET_PATH = './src/databases/mxm_dataset.db'

export {
  SERVER_PORT,
  STREAMING_URL,
  MXM_DATASET_PATH,
  SONG_MATCHER_WINDOW_SIZE,
  STREAMING_RECOGNITION_CONFIG,
  AUDIO_TRANSCRIPT_RESTART_INTERVAL
}
