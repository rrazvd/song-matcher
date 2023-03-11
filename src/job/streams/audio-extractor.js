import ffmpeg from 'fluent-ffmpeg'
import { M3U8_URL } from '../../settings'

export const audioExtractor = ffmpeg()
  .input(M3U8_URL)
  .withNoVideo()
  .withOutputFormat('flac')
  .withAudioCodec('flac')
  .withAudioChannels(1)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
