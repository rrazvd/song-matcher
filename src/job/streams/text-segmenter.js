import { Transform } from 'stream'
import _get from 'lodash/get'

const sanitizeArray = (arr) => arr.filter((word) => word !== '')

const getNewWords = (oldString, newString) => {
  const newStringArray = sanitizeArray(newString.split(' '))
  const oldStringArray = sanitizeArray(oldString.split(' '))

  const newStringArrayLength = newStringArray.length
  const oldStringArrayLength = oldStringArray.length

  const wordsDiff = newStringArrayLength - oldStringArrayLength

  console.log('------------------------------')
  console.log(`Old string: ${oldStringArray}\n`)
  console.log(`New string: ${newStringArray}\n`)
  console.log(`Length diff: ${wordsDiff}`)

  if (wordsDiff > 0) {
    const isSubstring = newString.includes(oldString)
    console.log(`Contains same sentence: ${isSubstring}`)
    const words = newStringArray.slice(oldStringArrayLength)
    return isSubstring ? words : newStringArray
  }

  if (wordsDiff < 0) {
    const isSubstring = oldString.startsWith(newString.substr(0, oldString.length / 2))
    console.log(`Contains same sentence: ${isSubstring}`)
    return isSubstring ? [] : newStringArray
  }

  const isSubstring = newString.includes(oldString)
  console.log(`Contains same sentence: ${isSubstring}`)
  if (isSubstring) return []

  return newStringArray
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
