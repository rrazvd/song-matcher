import { Transform } from 'stream'

class SongMatcher extends Transform {
  static database = undefined

  WINDOW_SIZE

  window = []

  matchedIds = {}

  constructor(database, windowSize) {
    super({ objectMode: true })
    this.database = database
    this.WINDOW_SIZE = windowSize
  }

  _transform(chunk, _, next) {
    const word = chunk

    this.database.all(`SELECT mxm_tid FROM lyrics where word='${word}'`, (err, rows) => {
      rows.forEach(({ mxm_tid: musicId }) => {
        if (this.matchedIds[musicId] === undefined) {
          this.matchedIds[musicId] = 1
          return
        }
        this.matchedIds[musicId] += 1
      })
      if (this.window.length <= this.WINDOW_SIZE) this.window.push(rows)
    })

    if (this.window.length > this.WINDOW_SIZE) {
      this.window.shift().forEach(({ mxm_tid: musicId }) => {
        if (this.matchedIds[musicId] > 1) {
          this.matchedIds[musicId] -= 1
          return
        }
        delete this.matchedIds[musicId]
      })
    }

    const ranking = Object
      .keys(this.matchedIds)
      .sort((a, b) => this.matchedIds[b] - this.matchedIds[a])
      .slice(0, 5)
      .map((musicId, index) => (
        {
          musicId,
          count: this.matchedIds[musicId],
          position: index + 1
        }
      ))

    this.push(`${JSON.stringify(ranking, null, 2)}\n\n`)
    next()
  }
}

export const songMatcher = ({ database, windowSize }) => new SongMatcher(database, windowSize)
