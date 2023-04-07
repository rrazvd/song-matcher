import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter,
  wordSuppressor
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  streamingUrl,
  transcriptorConfig,
  songMatcherWindowSize
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(textSegmenter())
  .pipe(wordSuppressor())
  .pipe(songMatcher({ database, windowSize: songMatcherWindowSize }))
