import { Transform } from 'stream'
import _get from 'lodash/get'

const getStringArray = (str) => str
  .toLowerCase()
  .split(' ')
  .filter((word) => word !== '')

const getNewWords = (oldString, newString) => {
  const newStringArray = getStringArray(newString)
  const oldStringArray = getStringArray(oldString)

  const newStringArrayLength = newStringArray.length
  const oldStringArrayLength = oldStringArray.length

  const wordsDiff = newStringArrayLength - oldStringArrayLength
  const startsWithSameWord = newStringArray[0] === oldStringArray[0]

  if (wordsDiff > 0) {
    const words = newStringArray.slice(oldStringArrayLength)
    return startsWithSameWord ? words : newStringArray
  }

  if (wordsDiff < 0) {
    return startsWithSameWord ? [] : newStringArray
  }

  if (oldStringArray.join(' ') === newStringArray.join(' ')) return []

  const newStringLastWord = newStringArray[newStringArrayLength - 1]
  const oldStringLastWord = oldStringArray[oldStringArrayLength - 1]

  const isLastWordIncomplete = newStringLastWord.startsWith(oldStringLastWord)

  if (startsWithSameWord && isLastWordIncomplete) return [newStringLastWord]

  return newStringArray
}

class TranscriptTokenizer extends Transform {
  previousTranscript = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')

    const newWords = getNewWords(this.previousTranscript, currentTranscript)

    newWords.forEach((word) => this.push(word))

    this.previousTranscript = currentTranscript
    next()
  }
}

export const transcriptTokenizer = () => new TranscriptTokenizer()
