export const getDataFromCacheOrDatabase = async ({ cache, database }, query) => {
  const cachedData = await cache.get(query)
  if (cachedData) return JSON.parse(cachedData)

  const data = await database.get(query)
  if (data.length > 1) await cache.set(query, JSON.stringify(data))

  return data
}
