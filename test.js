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
    const noLocalhost = nockCallObjects.filter((o) => {
      return ![
        'http://localhost:3101',
        'http://www.m5.is:80',
        'http://hraun.vedur.is:80',
        'http://www.vedur.is:80',
        'http://www.landspitali.is:80',
      ].includes(o.scope)
    })
    fs.writeFileSync(mockDataFilename, JSON.stringify(noLocalhost, null, 2))
  }
})
