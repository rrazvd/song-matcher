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

  // when the diff between strings is greater than 0 it means that there are new words
  const thereAreNewWords = lengthDiff > 0

  // if there are no new words the return should be empty array
  if (!thereAreNewWords) return []

  // the first new word position on new string array is the old string length
  const firstNewWordPosition = oldStringArrayLength

  const newWords = []
  for (let i = firstNewWordPosition; i < newStringArrayLength; i++) {
    newWords.push(newStringArray[i])
  }

  return newWords
}

class TextSegmenter extends Transform {
  lastTranscript = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')
    const newWords = getNewWords(this.lastTranscript, currentTranscript)

    if (currentTranscript) {
      this.lastTranscript = currentTranscript
    }

    newWords.forEach((word) => this.push(word))

    next()
  }
}

export const textSegmenter = new TextSegmenter()
