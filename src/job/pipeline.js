import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  streamingUrl,
  transcriptorConfig
}) => audioExtractor({ streamingUrl })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(textSegmenter())
  .pipe(songMatcher({ database }))
