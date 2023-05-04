import { Redis } from 'ioredis'

export const createRedisDatabase = () => new Redis()
