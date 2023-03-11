import {
  audioExtractor,
  audioTranscriptor,
  songMatcher,
  textSegmenter
} from './streams'

export const createSongMatcherPipeline = (database) => audioExtractor
  .pipe(audioTranscriptor)
  .pipe(textSegmenter)
  .pipe(songMatcher(database))
