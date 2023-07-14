import { Transform } from 'stream'

class SongMatcher extends Transform {
  constructor(windowSize, getSongsByWord) {
    super({ objectMode: true })

    this.WINDOW_SIZE = windowSize
    this.window = []
    this.matchedIds = {}

    this.getSongsByWord = getSongsByWord
  }

  _transform = async (chunk, _, next) => {
    const token = chunk

    // process the current token
    await this.processToken(token)

    // compute a descending ranking
    const ranking = this.getRanking()
    this.push(ranking)

    next()
  }

  processToken = async (token) => {
    const word = token
    const songs = await this.getSongsByWord(word)
    this.updateMatchs(songs)
  }

  updateMatchs = (songs) => {
    if (!songs) return

    // update window with new matched ids
    this.window.push(songs)

    // increase a counter for each matched id
    songs.forEach(({ id: songId }) => {
      if (this.matchedIds[songId] !== undefined) {
        this.matchedIds[songId] += 1
        return
      }
      this.matchedIds[songId] = 1
    })

    if (this.window.length > this.WINDOW_SIZE) {
      // update window removing expired matched songs
      const expiredSongs = this.window.shift()

      // decrease a counter for each expired matched id
      expiredSongs.forEach(({ id: songId }) => {
        if (this.matchedIds[songId] > 1) {
          this.matchedIds[songId] -= 1
          return
        }
        delete this.matchedIds[songId]
      })
    }
  }

  calculateScore = (songId) => Math.round((this.matchedIds[songId] / this.WINDOW_SIZE) * 100)

  getRanking = () => Object
    .keys(this.matchedIds)
    .sort((a, b) => this.matchedIds[b] - this.matchedIds[a])
    .slice(0, 5)
    .map((songId) => ({ songId, score: this.calculateScore(songId) }))
}

export const songMatcher = ({
  windowSize,
  getSongsByWord
}) => new SongMatcher(windowSize, getSongsByWord)
