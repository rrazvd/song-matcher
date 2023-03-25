import { Transform } from 'stream'

class SongMatcher extends Transform {
  static database = undefined

  wordCount = 0

  ranking = {}

  constructor(database) {
    super({ objectMode: true })
    this.database = database
  }

  _transform(chunk, _, next) {
    const word = chunk

    if (this.wordCount === 20) {
      const sortedRanking = Object
        .keys(this.ranking)
        .sort((a, b) => this.ranking[b] - this.ranking[a])
        .slice(0, 5)

      this.push(JSON.stringify(sortedRanking, null, 2))

      this.ranking = {}
      this.wordCount = 0
    }

    this.database.all(`SELECT mxm_tid FROM lyrics where word='${word}'`, (err, rows) => {
      rows.forEach(({ mxm_tid: mxmId }) => {
        if (this.ranking[mxmId] === undefined) {
          this.ranking[mxmId] = 1
          return
        }

        this.ranking[mxmId] += 1
      })
    })

    this.wordCount += 1
    next()
  }
}

export const songMatcher = ({ database }) => new SongMatcher(database)
