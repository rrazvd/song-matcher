import { Transform } from 'stream'

export const songMatcher = new Transform({
  objectMode: true,
  transform(chunk, _, next) {
    const word = chunk
    next(null, ` ${word}`)
  }
})
