import { Transform } from 'stream'
import _get from 'lodash/get'

const getTokens = (str) => str
  .toLowerCase()
  .split(' ')
  .filter((tkn) => tkn !== '')

const getNewTokens = (lastTranscript, currentTranscript) => {
  const currentTokens = getTokens(currentTranscript)
  const lastTokens = getTokens(lastTranscript)

  const tknDiff = currentTokens.length - lastTokens.length
  const isFirstTokenEqual = currentTokens[0] === lastTokens[0]

  if (tknDiff > 0) return isFirstTokenEqual ? currentTokens.slice(lastTokens.length) : currentTokens
  if (tknDiff < 0) return isFirstTokenEqual ? [] : currentTokens

  const hasTheSameTokens = lastTokens.join(' ') === currentTokens.join(' ')
  if (hasTheSameTokens) return []

  const isLastTokenSimilar = currentTokens.at(-1).startsWith(lastTokens.at(-1))
  if (isFirstTokenEqual && isLastTokenSimilar) return [currentTokens.at(-1)]

  return currentTokens
}

class TranscriptTokenizer extends Transform {
  lastTranscript = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')

    const tokens = getNewTokens(this.lastTranscript, currentTranscript)
    tokens.forEach((token) => this.push(token))

    this.lastTranscript = currentTranscript
    next()
  }
}

export const transcriptTokenizer = () => new TranscriptTokenizer()
