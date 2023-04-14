import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  transcriptTokenizer,
  tokenSuppressor
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  streamingUrl,
  transcriptorConfig,
  songMatcherWindowSize
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(transcriptTokenizer())
  .pipe(tokenSuppressor())
  .pipe(songMatcher({ database, windowSize: songMatcherWindowSize }))
