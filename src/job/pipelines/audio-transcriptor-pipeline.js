import { audioExtractor, audioTranscriptor } from '../streams'

export const createAudioTranscriptorPipeline = ({
  streamingUrl,
  config
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config }))
