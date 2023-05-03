const {
  SERVER_PORT = 3000,
  STREAMING_URL = '',
  STREAM_SAMPLE_RATE_HERTZ = 48000,
  LANGUAGE_CODE = 'pt-BR',
  SONG_MATCHER_WINDOW_SIZE = 20,
  AUDIO_TRANSCRIPT_RESTART_INTERVAL = 300000
} = process.env

const MXM_DATASET_PATH = './src/databases/mxm_dataset.db'

const STREAMING_RECOGNITION_CONFIG = {
  config: {
    encoding: 'FLAC',
    sampleRateHertz: STREAM_SAMPLE_RATE_HERTZ,
    languageCode: LANGUAGE_CODE,
    model: 'latest_long',
    audioChannelCount: 1
  },
  interimResults: true
}

export {
  SERVER_PORT,
  STREAMING_URL,
  STREAMING_RECOGNITION_CONFIG,
  MXM_DATASET_PATH,
  SONG_MATCHER_WINDOW_SIZE,
  AUDIO_TRANSCRIPT_RESTART_INTERVAL
}
