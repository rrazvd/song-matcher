import ffmpeg from 'fluent-ffmpeg'

const transmissionStartTimestampLogger = (progress) => {
  const transmissionStarted = process.env.TRANSMISSION_STARTED === '1'
  if (progress.targetSize > 20 && !transmissionStarted) {
    console.log('TRANSMISSION STARTED ON: ', Date.now())
    process.env.TRANSMISSION_STARTED = 1
  }
}

export const audioExtractor = ({ streamingUrl }) => ffmpeg()
  .input(streamingUrl)
  .on('progress', transmissionStartTimestampLogger)
  .withNoVideo()
  .withOutputFormat('flac')
  .withAudioCodec('flac')
  .withAudioChannels(1)
  .on('error', (err) => { console.log(`FFMPEG ERROR: ${err.message}`) })
