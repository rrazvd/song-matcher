import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  transcriptTokenizer,
  wordSuppressor
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  streamingUrl,
  transcriptorConfig,
  songMatcherWindowSize
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(transcriptTokenizer())
  .pipe(wordSuppressor())
  .pipe(songMatcher({ database, windowSize: songMatcherWindowSize }))
