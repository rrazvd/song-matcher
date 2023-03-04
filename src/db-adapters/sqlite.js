import sqlite3 from 'sqlite3'

export const createSqliteAdapter = () => {
  const db = new sqlite3.Database('./src/db-adapters/mxm_dataset.db', sqlite3.OPEN_READONLY, (error) => {
    if (error) console.log(error)
  })

  db.on('open', () => {
    console.log('MXM Dataset has sucessfully opened.')
  })

  return db
}
