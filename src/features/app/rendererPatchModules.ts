// todo: remote integration should be removed after moving db to main process
import { remote } from 'electron'
import path from 'path'
import bindings from 'bindings'

const { getRoot } = bindings
bindings.getRoot = (file: string) => {
  const stack = new Error().stack
  if (stack?.includes('better-sqlite3')) {
    return path.join(remote.app.getAppPath(), 'node_modules', 'better-sqlite3')
  } else {
    return getRoot(file)
  }
}
