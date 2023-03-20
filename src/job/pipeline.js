import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter,
  wordSupress
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  streamingUrl,
  transcriptorConfig
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(textSegmenter())
  .pipe(wordSupress())
  .pipe(songMatcher({ database }))
