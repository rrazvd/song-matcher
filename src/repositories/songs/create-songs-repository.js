import { getSongsByWord } from './methods'

export const createSongsRepository = (...args) => ({
  getSongsByWord: getSongsByWord(...args)
})
