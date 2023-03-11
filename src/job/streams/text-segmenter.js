import { Transform } from 'stream'
import _get from 'lodash/get'

const getNewWords = (oldString, newString) => {
  const oldStringArray = oldString.split(' ')
  const newStringArray = newString.split(' ')
  const newStringArrayLength = newStringArray.length
  const oldStringArrayLength = oldStringArray.length

  // if old string array is empty, new words are the entire new string array
  if (oldStringArrayLength === 0) return newStringArray

  const lengthDiff = newStringArrayLength - oldStringArrayLength
  const startsWithSameWord = oldString.startsWith(newStringArray[0])

  if (lengthDiff <= 0 && startsWithSameWord) return []
  if (lengthDiff <= 0 && !startsWithSameWord) return newStringArray

  // the first new word position on new string array is the old string length
  const firstNewWordPosition = oldStringArrayLength

  const newWords = []
  for (let i = firstNewWordPosition; i < newStringArrayLength; i++) {
    newWords.push(newStringArray[i])
  }

  return newWords
}

class TextSegmenter extends Transform {
  previousTranscript = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')
    const newWords = getNewWords(this.previousTranscript, currentTranscript)

    if (currentTranscript) {
      this.previousTranscript = currentTranscript
    }

    newWords.forEach((word) => this.push(word))

    next()
  }
}

export const textSegmenter = () => new TextSegmenter()
