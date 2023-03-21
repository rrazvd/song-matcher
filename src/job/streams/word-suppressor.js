import { Transform } from 'stream'

class WordSuppressor extends Transform {
  previousWord = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentWord = chunk

    const previousWordMustBePushed = this.previousWord
      && !(this.previousWord.length > 1 && currentWord.startsWith(this.previousWord))

    if (previousWordMustBePushed) this.push(this.previousWord)

    this.previousWord = currentWord
    next()
  }
}

export const wordSuppressor = () => new WordSuppressor()
