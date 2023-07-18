import { Redis } from 'ioredis'

export const createRedisDatabase = () => {
  const db = new Redis()

  return {
    instance: db,
    get: (...args) => db.get(...args),
    set: (...args) => db.set(...args)
  }
}
