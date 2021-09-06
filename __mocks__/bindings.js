const bindings = require('../node_modules/bindings/bindings')
const { remote } = require('electron')
const path = require('path')

// better-sqlite3 is relying on 'bindings' which doesn't work well with electron
// this file is a mock for 'bindings' to manually resolve executable path
// better_sqlite3.node is executable which is moved in forge.config.js to app resources

module.exports = opts => {
  if (opts !== 'better_sqlite3.node') {
    return bindings(opts)
  }

  if (process.env.JEST_WORKER_ID) {
    return require('better-sqlite3/build/Release/better_sqlite3.for-jest.node')
  } else if (remote.app.isPackaged) {
    // eslint-disable-next-line no-undef
    return __non_webpack_require__(
      path.join(process.resourcesPath, 'better_sqlite3.node'),
    )
  } else {
    // eslint-disable-next-line no-undef
    return __non_webpack_require__(
      'better-sqlite3/build/Release/better_sqlite3.node',
    )
  }
}
