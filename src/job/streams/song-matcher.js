import { Transform } from 'stream'

export const songMatcher = (database) => new Transform({
  objectMode: true,
  transform(chunk, _, next) {
    const word = chunk
    console.log(database)
    next(null, ` ${word}`)
  }
})
