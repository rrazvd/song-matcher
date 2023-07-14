import { compose } from 'stream'

import {
  transcriptTokenizer,
  tokenSuppressor,
  songMatcher
} from './streams'

export const createSongMatcherPipeline = ({
  windowSize,
  getSongsByWord
}) => compose(
  transcriptTokenizer(),
  tokenSuppressor(),
  songMatcher({ windowSize, getSongsByWord })
)
