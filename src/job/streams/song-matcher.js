import { Transform } from 'stream'

class SongMatcher extends Transform {
  static database = undefined

  wordCount = 0

  matchedIds = {}

  constructor(database) {
    super({ objectMode: true })
    this.database = database
  }

  _transform(chunk, _, next) {
    const word = chunk

    if (this.wordCount === 20) {
      const ranking = Object
        .keys(this.matchedIds)
        .sort((a, b) => this.matchedIds[b] - this.matchedIds[a])
        .slice(0, 5)

      this.push(JSON.stringify(ranking, null, 2))

      this.matchedIds = {}
      this.wordCount = 0
    }

    this.database.all(`SELECT mxm_tid FROM lyrics where word='${word}'`, (err, rows) => {
      rows.forEach(({ mxm_tid: musicId }) => {
        if (this.matchedIds[musicId] === undefined) {
          this.matchedIds[musicId] = 1
          return
        }

        this.matchedIds[musicId] += 1
      })
    })

    this.wordCount += 1
    next()
  }
}

export const songMatcher = ({ database }) => new SongMatcher(database)
