import path from 'path'
import fs from 'fs'

const migrationsPath = path.join(
  __dirname,
  '..',
  'src',
  'features',
  'pastelDB',
  'migrations',
)

const fileNameIndex = process.argv.indexOf(__filename)
if (fileNameIndex === -1 || fileNameIndex === process.argv.length - 1) {
  throw new Error('Can not get migration name')
}

if (!fs.existsSync(migrationsPath)) {
  fs.mkdirSync(migrationsPath)
}

const migrationName = `${Math.floor(Date.now() / 1000)}-${
  process.argv[fileNameIndex + 1]
}.sql`
const migrationPath = path.join(migrationsPath, migrationName)

fs.writeFileSync(migrationPath, '')

console.log(`Created: ${migrationPath}`)
