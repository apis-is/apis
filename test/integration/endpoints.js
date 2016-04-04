// Turn test mode on
process.env.INTEGRATION = true

import fs from 'fs'
import path from 'path'
import fileModule from 'file'

const testDir = 'tests'
const testFileName = 'integration_test.js'

describe('endpoint', () => {
  it('should load the server and set everything up properly', (done) => {
    const app = require(`${process.cwd()}/server`)

    app.on('ready', () => {
      fileModule.walkSync('./endpoints', (dirPath, dirs, files) => {
        if (dirPath.indexOf(testDir) < 0) return

        files.forEach((file) => {
          if (file !== testFileName) return

          const fullPath = `${dirPath}/${file}`

          if (!fs.existsSync(fullPath)) return
          if (path.extname(fullPath) !== '.js') return

          require(`../../${fullPath}`)
        })
      })

      done()
    })
  }).timeout(10000)
})
