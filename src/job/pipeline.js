import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter
} from './streams'

export const getSongMatcherStream = () => audioExtractor
  .pipe(audioTranscriptor)
  .pipe(textSegmenter)
  .pipe(songMatcher)
