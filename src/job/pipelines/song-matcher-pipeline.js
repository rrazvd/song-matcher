import { compose } from 'stream'

import {
  transcriptTokenizer,
  tokenSuppressor,
  songMatcher
} from './streams'

export const createSongMatcherPipeline = ({
  windowSize,
  database,
  cache
}) => compose(
  transcriptTokenizer(),
  tokenSuppressor(),
  songMatcher({ windowSize, database, cache })
)
