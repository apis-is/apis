const fs = require('fs')
const nock = require('nock')

const mockDataFilename = './mock-data.json'

before(() => {
  if (process.env.RECORD_MOCK_DATA) {
    nock.recorder.rec({
      output_objects: true,
      dont_print: true,
    })
  } else {
    nock.load(mockDataFilename)
  }
})

after(() => {
  if (process.env.RECORD_MOCK_DATA) {
    const nockCallObjects = nock.recorder.play()
    fs.writeFileSync(mockDataFilename, JSON.stringify(nockCallObjects, null, 2))
  }
})
