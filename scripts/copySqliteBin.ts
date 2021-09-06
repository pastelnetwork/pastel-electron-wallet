import fs from 'fs'
import path from 'path'

// to run in electron better_sqlite3.node is recompiled with electron-rebuild
// bot to run in tests we still need a version compiled for current node
// this script is copying better_sqlite3.node to not be recompiled to use it in tests

const sqlitePath = require.resolve(
  'better-sqlite3/build/Release/better_sqlite3.node',
)

const forJestPath = path.join(
  path.dirname(sqlitePath),
  'better_sqlite3.for-jest.node',
)

if (!fs.existsSync(forJestPath)) {
  fs.copyFile(
    sqlitePath,
    path.join(path.dirname(sqlitePath), 'better_sqlite3.for-jest.node'),
    err => {
      if (err) {
        console.error(err)
      }
    },
  )
}
