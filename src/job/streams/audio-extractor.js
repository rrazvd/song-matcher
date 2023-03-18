import ffmpeg from 'fluent-ffmpeg'

export const audioExtractor = ({ streamingUrl }) => ffmpeg()
  .input(streamingUrl)
  .withNoVideo()
  .withOutputFormat('flac')
  .withAudioCodec('flac')
  .withAudioChannels(1)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
