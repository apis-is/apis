import request from 'request'
import helpers from '../../../lib/test_helpers.js'
import assert from 'assert'
import moment from 'moment'

const transactionTypes = ['buy', 'sell']

describe('stats', function () {
  this.timeout(20000)
  const statsFieldsType = {
    ask: Number,
    bid: Number,
    daily_change: Number,
    daily_change_percent: Number,
    global_units: Number,
    global_volume: Number,
    last_price: Number,
    last_transaction_type: String,
    market_cap: Number,
    max: Number,
    min: Number,
    open: Number,
    volume_1h: Number,
    volume_1h_buy: Number,
    volume_1h_sell: Number,
    volume_24h: Number,
    volume_24h_buy: Number,
    volume_24h_sell: Number,
    timestampApis: Date,
  }
  const statsFields = Object.keys(statsFieldsType)
  const timestampFormat = 'YYYY-MM-DDTHH:mm:ss'
  it('should return object containing specific fields with correct types', (done) => {
    const params = helpers.testRequestParams('/aur')
    request.get(params, (err, res, body) => {
      if (err) throw err
      let json
      try {
        json = JSON.parse(body)
      } catch (e) {
        throw e
      }
      helpers.assertPresenceOfFields(statsFields, [json])
      helpers.assertTypesOfFields(statsFieldsType, [json])
      assert(
        ~transactionTypes.indexOf(json.last_transaction_type),
        `Unexpected transaction type '${json.last_transaction_type}'`
      )
      assert(
        moment(json.timestampApis, timestampFormat, true).isValid(),
        `Unexpected timestamp format, ${json.timestampApis}' does not match ${timestampFormat}`
      )
      done()
    })
  })
})

describe('history', function () {
  this.timeout(20000)
  const historyFieldsType = {
    date: Date,
    rate: Number,
  }
  const historyFields = Object.keys(historyFieldsType)
  const timestampFormat = 'YYYY-MM-DDTHH:mm:ss'
  const dateFormat = 'YYYY-MM-DD'
  it('should return results array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/aur/history')
    request.get(params, (err, res, body) => {
      if (err) throw err
      let json
      try {
        json = JSON.parse(body)
      } catch (e) {
        throw e
      }
      assert(json.results, 'Does not contain a \'results\' field')
      assert(json.currency, 'Does not contain a \'currency\' field')
      assert(json.market, 'Does not contain a \'market\' field')
      helpers.assertPresenceOfFields(historyFields, json.results)
      helpers.assertTypesOfFields(historyFieldsType, json.results)
      assert(
        json.currency.constructor === String,
        'Unexpected currency type, should be String'
      )
      assert(
        json.market.constructor === String,
        'Unexpected market type, should be String'
      )
      assert(
        moment(json.timestampApis, timestampFormat, true).isValid(),
        `Unexpected timestamp format, '${json.timestampApis}' does not match ${timestampFormat}`
      )
      json.results.forEach((result, i) => {
        assert(
          moment(result.date, dateFormat, true).isValid(),
          (`Unexpected date format in result #${i};` +
          ` '${result.date}' does not match ${dateFormat}`)
        )
      })
      done()
    })
  })
})

describe('transactions', function () {
  this.timeout(20000)
  const transactionsFieldsType = {
    id: Number,
    amount_isk: Number,
    amount_aur: Number,
    rate: Number,
    type: String,
    timestamp: Date,
  }
  const transactionsFields = Object.keys(transactionsFieldsType)
  const timestampFormat = 'YYYY-MM-DDTHH:mm:ss'
  it('should return results array of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/aur/transactions')
    request.get(params, (err, res, body) => {
      if (err) throw err
      let json
      try {
        json = JSON.parse(body)
      } catch (e) {
        throw e
      }
      assert(json.results, 'Does not contain a \'results\' field')
      helpers.assertPresenceOfFields(transactionsFields, json.results)
      helpers.assertTypesOfFields(transactionsFieldsType, json.results)
      json.results.forEach((result, i) => {
        assert(
          ~transactionTypes.indexOf(result.type),
          `Unexpected transaction type '${result.type}' in result #${i}`
        )
        assert(
          moment(result.timestamp, timestampFormat, true).isValid(),
          (`Unexpected timestamp format in result #${i};` +
          ` '${result.timestamp}' does not match ${timestampFormat}`)
        )
      })
      done()
    })
  })
})

describe('order-book', function () {
  this.timeout(20000)
  const bidAskFieldsType = {
    rate: Number,
    order_amount_aur: Number,
    order_value_isk: Number,
    timestamp: Date,
  }
  const bidAskFields = Object.keys(bidAskFieldsType)
  const timestampFormat = 'YYYY-MM-DDTHH:mm'
  it('should return bid/ask arrays of objects containing correct fields', (done) => {
    const params = helpers.testRequestParams('/aur/order-book')
    request.get(params, (err, res, body) => {
      if (err) throw err
      let json
      try {
        json = JSON.parse(body)
      } catch (e) {
        throw e
      }
      assert(json.ask, 'Does not contain a \'ask\' field')
      helpers.assertPresenceOfFields(bidAskFields, json.ask)
      helpers.assertTypesOfFields(bidAskFieldsType, json.ask)
      json.ask.forEach((result, i) => {
        assert(
          moment(result.timestamp, timestampFormat, true).isValid(),
          (`Unexpected timestamp format in ask result #${i};` +
          ` '${result.timestamp}' does not match ${timestampFormat}`)
        )
      })
      assert(json.bid, 'Does not contain a \'bid\' field')
      helpers.assertPresenceOfFields(bidAskFields, json.bid)
      helpers.assertTypesOfFields(bidAskFieldsType, json.bid)
      json.bid.forEach((result, i) => {
        assert(
          moment(result.timestamp, timestampFormat, true).isValid(),
          (`Unexpected timestamp format in bid result #${i};` +
          ` "${result.timestamp}" does not match ${timestampFormat}`)
        )
      })
      done()
    })
  })
})
