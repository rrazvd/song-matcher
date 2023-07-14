import { getDataFromCacheOrDatabase } from '../../../utils'
import { songParser } from '../parsers'

export const getSongsByWord = ({ clients }) => async (word) => getDataFromCacheOrDatabase(clients, `SELECT mxm_tid, count FROM lyrics where word='${word}'`)
  .then((songs) => songs.map(songParser))
