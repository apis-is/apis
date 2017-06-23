import assert from 'assert'

function assertResults(json, canBeEmpty) {
  assert(json.results, "Does not contain a 'results' field")
  if (!canBeEmpty) {
    assert(json.results.length > 0, 'Results are empty')
  }
}

function assertPresenceOfFields(fields, arr) {
  arr.forEach((result, i) => {
    fields.forEach((field) => {
      const fieldExists = result[field] !== undefined
      assert(fieldExists, `Missing field ${field} in result #${i}`)
    })
  })
}

/*
   Asserts that all fields provided are of the expected type (Date is a bit
   messy, since it will be a string until we actually try to parse it as a Date).
   */
function assertTypesOfFields(fields, arr) {
  arr.forEach((result) => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        const type = fields[key]
        const value = result[key]
        let constructor = value.constructor
        if (type === Date && !Number.isNaN(Date.parse(value))) {
          constructor = Date
        }
        assert(
          constructor === type,
          `Field ${key} should be ${type.name}, but is ${constructor.name}`
        )
      }
    }
  })
}

// always returns the same fields, so we'll just reuse this function for both cases
// (I may be going a bit overboard on this)
exports.testRequestHandlerForFields = (done, fieldsToCheckFor, customCallback, canBeEmpty) => {
  return (err, res, body) => {
    if (err) throw err
    let json
    try {
      json = JSON.parse(body)
    } catch (e) {
      throw e
    }

    // Check for the presence of the results property
    assertResults(json, canBeEmpty)

    const fieldsIsObject = fieldsToCheckFor.constructor === Object
    const fields = fieldsIsObject ? Object.keys(fieldsToCheckFor) : fieldsToCheckFor

    if (!canBeEmpty) {
      // Check for the presence of all expected fields
      assertPresenceOfFields(fields, json.results)
    }

    if (fieldsIsObject) {
      assertTypesOfFields(fieldsToCheckFor, json.results)
    }

    if (customCallback) {
      customCallback.call(null, json)
    }

    done()
  }
}
// Generate http request params for a particular endpoint
exports.testRequestParams = (path, form) => {
  return {
    url: `http://localhost:3101${path}`,
    method: 'GET',
    qs: form,
    headers: ['Content-Type: application/json'],
  }
}
exports.assertPresenceOfFields = assertPresenceOfFields
exports.assertTypesOfFields = assertTypesOfFields
