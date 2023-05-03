import { compose } from 'stream'

import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  transcriptTokenizer,
  tokenSuppressor
} from './streams'

export const createAudioTranscriptorPipeline = ({
  streamingUrl,
  transcriptorConfig
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))

export const createSongMatcherPipeline = ({
  database,
  songMatcherWindowSize
}) => compose(
  transcriptTokenizer(),
  tokenSuppressor(),
  songMatcher({ database, windowSize: songMatcherWindowSize })
)
