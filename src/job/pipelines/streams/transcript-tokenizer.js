import { Transform } from 'stream'
import _get from 'lodash/get'

const getTokens = (str) => str
  .toLowerCase()
  .split(' ')
  .filter((tkn) => tkn !== '')

const getNewTokens = (lastTokens, currentTokens) => {
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

export const transcriptTokenizer = () => {
  let lastTranscript = ''

  const stream = new Transform({ objectMode: true })

  stream._transform = function (chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')

    const currentTokens = getTokens(currentTranscript)
    const lastTokens = getTokens(lastTranscript)

    const tokens = getNewTokens(lastTokens, currentTokens)
    tokens.forEach((token) => this.push(token))

    lastTranscript = currentTranscript
    next()
  }

  return stream
}
