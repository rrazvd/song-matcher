import ffmpeg from 'fluent-ffmpeg'

export const audioExtractor = ({ streamingUrl }) => ffmpeg()
  .input(streamingUrl)
  .on('progress', (progress) => {
    const transmissionStarted = process.env.TRANSMISSION_STARTED === '1'
    if (progress.targetSize > 20 && !transmissionStarted) {
      const timestamp = Date.now()
      console.log('TRANSMISSION_STARTED TIMESTAMP: ', timestamp)
      process.env.TRANSMISSION_STARTED = 1
    }
  })
  .withNoVideo()
  .withOutputFormat('flac')
  .withAudioCodec('flac')
  .withAudioChannels(1)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
