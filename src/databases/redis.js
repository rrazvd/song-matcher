import { Redis } from 'ioredis'

export const createRedisDatabase = () => {
  const db = new Redis()

  return {
    instance: db,
    methods: {
      get: (key, ...args) => db.get(key, ...args),
      set: (key, value, ...args) => db.set(key, value, ...args)
    }
  }
}
