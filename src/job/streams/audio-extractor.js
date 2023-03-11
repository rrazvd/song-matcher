import ffmpeg from 'fluent-ffmpeg'

export const audioExtractor = ({ m3u8Url }) => ffmpeg()
  .input(m3u8Url)
  .withNoVideo()
  .withOutputFormat('flac')
  .withAudioCodec('flac')
  .withAudioChannels(1)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
