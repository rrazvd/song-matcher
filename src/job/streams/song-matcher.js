import { Transform } from 'stream'

class SongMatcher extends Transform {
  constructor(windowSize, database, cache) {
    super({ objectMode: true })

    this.WINDOW_SIZE = windowSize
    this.window = []
    this.matchedIds = {}

    this.database = database
    this.cache = cache
  }

  _transform(chunk, _, next) {
    const token = chunk

    // process the current token
    this.processToken(token)

    // compute a descending ranking
    const ranking = this.getRanking()
    this.push(ranking)

    next()
  }

  processToken(token) {
    this.cache.get(token, (error, result) => {
      if (error) return

      if (result) {
        const rows = JSON.parse(result)
        this.updateMatchs(rows)
        return
      }

      this.database.all(`SELECT mxm_tid FROM lyrics where word='${token}'`, (err, rows) => {
        this.cache.set(token, JSON.stringify(rows))
        this.updateMatchs(rows)
      })
    })
  }

  updateMatchs(rows) {
    // update window with new matched ids
    this.window.push(rows)

    // increase a counter for each matched id
    rows.forEach(({ mxm_tid: songId }) => {
      if (this.matchedIds[songId] !== undefined) {
        this.matchedIds[songId] += 1
        return
      }
      this.matchedIds[songId] = 1
    })

    if (this.window.length > this.WINDOW_SIZE) {
      // update window removing expired matched ids
      const expiredMatchedIds = this.window.shift()

      // decrease a counter for each expired matched id
      expiredMatchedIds.forEach(({ mxm_tid: songId }) => {
        if (this.matchedIds[songId] > 1) {
          this.matchedIds[songId] -= 1
          return
        }
        delete this.matchedIds[songId]
      })
    }
  }

  getRanking() {
    return Object
      .keys(this.matchedIds)
      .sort((a, b) => this.matchedIds[b] - this.matchedIds[a])
      .slice(0, 5)
      .map((songId) => ({ songId, score: this.calculateScore(songId) }))
  }

  calculateScore(songId) {
    return Math.round((this.matchedIds[songId] / this.WINDOW_SIZE) * 100)
  }
}

export const songMatcher = ({
  windowSize,
  database,
  cache
}) => new SongMatcher(windowSize, database, cache)
