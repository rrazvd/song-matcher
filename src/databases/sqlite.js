import sqlite3 from 'sqlite3'

export const createSqliteDatabase = (path) => {
  const db = new sqlite3.Database(path, sqlite3.OPEN_READONLY, (error) => {
    if (error) console.log(error)
  })

  db.on('open', () => {
    console.log('SQLite database has successfully opened.')
  })

  return db
}
