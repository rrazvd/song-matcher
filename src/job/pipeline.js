import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter
} from './streams'

export const createSongMatcherPipeline = ({
  database,
  m3u8Url,
  transcriptorConfig
}) => audioExtractor({ m3u8Url })
  .pipe(audioTranscriptor({ config: transcriptorConfig }))
  .pipe(textSegmenter())
  .pipe(songMatcher({ database }))
