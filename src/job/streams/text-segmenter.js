import { Transform } from 'stream'
import _get from 'lodash/get'

const sanitizeArray = (arr) => arr.filter((word) => word !== '')

const getNewWords = (oldString, newString) => {
  const newStringArray = sanitizeArray(newString.split(' '))
  const oldStringArray = sanitizeArray(oldString.split(' '))

  const newStringArrayLength = newStringArray.length
  const oldStringArrayLength = oldStringArray.length

  const wordsDiff = newStringArrayLength - oldStringArrayLength
  const startsWithSameWord = newStringArray[0] === oldStringArray[0]

  /*   console.log('------------------------------')
  console.log(`Old string: ${oldStringArray.join(' ')}\n`)
  console.log(`New string: ${newStringArray.join(' ')}\n`)
  console.log(`Length diff: ${wordsDiff}`)
  console.log(`Start with same word: ${startsWithSameWord}`) */

  if (wordsDiff > 0) {
    const words = newStringArray.slice(oldStringArrayLength)
    return startsWithSameWord ? words : newStringArray
  }

  if (wordsDiff < 0) {
    return startsWithSameWord ? [] : newStringArray
  }

  const newStringLastWord = newStringArray[newStringArrayLength - 1]
  const oldStringLastWord = oldStringArray[oldStringArrayLength - 1]

  const isSubstring = newString.includes(oldString)
  // console.log(`Contains same sentence: ${isSubstring}`)

  if (isSubstring) return newStringLastWord === oldStringLastWord ? [] : [newStringLastWord]

  return startsWithSameWord ? [] : newStringArray
}

class TextSegmenter extends Transform {
  previousTranscript = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentTranscript = _get(chunk, 'results[0].alternatives[0].transcript')

    const newWords = getNewWords(
      this.previousTranscript.toLowerCase(),
      currentTranscript.toLowerCase()
    )

    console.log('New words: ', newWords.join(' '), '\n')

    newWords.forEach((word) => this.push(word))
    this.previousTranscript = currentTranscript
    next()
  }
}

export const textSegmenter = () => new TextSegmenter()
