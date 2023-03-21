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
  transcriptorConfig
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(textSegmenter())
  .pipe(wordSuppressor())
  .pipe(songMatcher({ database }))
