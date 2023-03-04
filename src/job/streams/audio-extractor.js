import ffmpeg from 'fluent-ffmpeg'
import { M3U8_URL } from '../../settings'

export const audioExtractor = ffmpeg(M3U8_URL)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
  .format('flac')
  .audioCodec('flac')
