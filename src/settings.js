const {
  SERVER_PORT = 3000,
  M3U8_URL = '',
  LANGUAGE_CODE = 'pt-BR',
} = process.env

const STREAMING_RECOGNIZE_CONFIG = {
  config: {
    encoding: 'FLAC',
    sampleRateHertz: 48000,
    languageCode: LANGUAGE_CODE,
    model: 'latest_long',
    audioChannelCount: 1,
  },
  interimResults: true,
}

export {
  SERVER_PORT,
  M3U8_URL,
  STREAMING_RECOGNIZE_CONFIG,
}
