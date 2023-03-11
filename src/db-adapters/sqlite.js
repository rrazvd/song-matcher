import sqlite3 from 'sqlite3'
import { MXM_DATASET_PATH } from '../settings'

export const createSqliteAdapter = () => {
  const db = new sqlite3.Database(MXM_DATASET_PATH, sqlite3.OPEN_READONLY, (error) => {
    if (error) console.log(error)
  })

  db.on('open', () => {
    console.log('MXM Dataset has sucessfully opened.')
  })

  return db
}
