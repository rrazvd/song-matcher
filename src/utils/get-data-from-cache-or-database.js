export const getDataFromCacheOrDatabase = async ({ cache, database }, query) => {
  const cachedData = await cache.methods.get(query)

  if (cachedData) return JSON.parse(cachedData)

  const data = await database.methods.get(query)

  await cache.methods.set(query, JSON.stringify(data))

  return data
}
