import { Transform } from 'stream'

class WordSupress extends Transform {
  previousWord = undefined

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentWord = chunk
    if (!this.previousWord) {
      this.previousWord = currentWord
      return next()
    }

    const isIncluded = currentWord.startsWith(this.previousWord)

    if (isIncluded && this.previousWord.length > 1) {
      this.previousWord = currentWord
      return next()
    }

    this.push(this.previousWord)
    this.previousWord = currentWord
    return next()
  }
}

export const wordSupress = () => new WordSupress()
