// Turn test mode on
process.env.INTEGRATION = true

import Mocha from 'mocha'
import path from 'path'
import fs from 'fs'

const mocha = new Mocha({
  timeout: 5000,
})
// process.args[2] is the first argument passed to the script
const testFile = process.argv[2]
const testFileAbs = path.join(process.cwd(), testFile)

// Ensure that the testFile exists
try {
  fs.accessSync(testFileAbs, fs.F_OK)
} catch (e) {
  console.error(`\n[ERROR] file ${testFile} does not exist`)
}

const app = require(`${process.cwd()}/server`)

app.on('ready', () => {
  mocha.addFile(testFileAbs)
  mocha.run(failures => {
    // exit with non-zero status if there were failures
    process.on('exit', () => process.exit(failures))
    process.exit()
  })
})
