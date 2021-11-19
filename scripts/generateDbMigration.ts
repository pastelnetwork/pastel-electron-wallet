import path from 'path'
import fs from 'fs'
import log from 'electron-log'

const migrationsPath = path.join(
  __dirname,
  '..',
  'src',
  'features',
  'pastelDB',
  'migrations',
)

const fileNameIndex: number = process.argv.indexOf(__filename)
if (fileNameIndex === -1 || fileNameIndex === process.argv.length - 1) {
  throw new Error('Can not get migration name')
}

if (!fs.existsSync(migrationsPath)) {
  fs.mkdirSync(migrationsPath)
}
const fileName: string = process.argv[fileNameIndex + 1] || ''
const migrationName = `${Math.floor(Date.now() / 1000)}-${fileName}.sql`
const migrationPath: string = path.join(migrationsPath, migrationName) || ''

fs.writeFileSync(migrationPath, '')

log.log(`Created: ${migrationPath}`)
