import request from 'request'
import moment from 'moment'
import app from '../../server'

// set cache time to 2 minutes
const cacheTime = 120

function queryGzipJson(url, callback) {
  const headers = {
    'user-agent': 'apis.is',
  }
  request.get({
    headers,
    url,
    gzip: true,
    json: true,
  }, (error, response, data) => {
    if (error || response.statusCode !== 200) {
      callback(error, response, null)
    }
    callback(error, response, data)
  })
}

function queryStats(callback) {
  queryGzipJson('https://isx.is/api/stats?currency=isk&market=aur', callback)
}

function queryHistory(callback) {
  // permitted values for timeframe are "1mon", "3mon", "6mon", "1year" and "ytd"
  // default is "1mon", "ytd" is from last new years eve to present
  queryGzipJson(
    'https://isx.is/api/historical-prices?currency=isk&market=aur&timeframe=1year',
    callback
  )
}

function queryTransactions(callback) {
  // set limit to OVER 9000
  queryGzipJson(
    'https://isx.is/api/transactions?currency=isk&market=aur&limit=9001',
    callback
  )
}

function queryOrderBook(callback) {
  queryGzipJson('https://isx.is/api/order-book?currency=isk&market=aur', callback)
}

function formatStatsData(data) {
  return {
    volume_1h: data.stats['1h_volume'],
    volume_1h_buy: data.stats['1h_volume_buy'],
    volume_1h_sell: data.stats['1h_volume_sell'],
    volume_24h: data.stats['24h_volume'],
    volume_24h_buy: data.stats['24h_volume_buy'],
    volume_24h_sell: data.stats['24h_volume_sell'],
    ask: data.stats.ask,
    bid: data.stats.bid,
    daily_change: data.stats.daily_change,
    daily_change_percent: data.stats.daily_change_percent,
    global_units: data.stats.global_units,
    global_volume: data.stats.global_volume,
    last_price: data.stats.last_price,
    last_transaction_type: data.stats.last_transaction_type.toLowerCase(),
    market_cap: data.stats.market_cap,
    max: data.stats.max,
    min: data.stats.min,
    open: data.stats.open,
    timestampApis: moment().format('YYYY-MM-DDTHH:mm:ss'),
  }
}

function formatHistoryData(data) {
  const formattedData = {
    results: [],
    currency: data.currency,
    market: data.market,
    timestampApis: moment().format('YYYY-MM-DDTHH:mm:ss'),
  }
  data.data.forEach((result) => {
    formattedData.results.push({
      date: result.date,
      rate: result.price,
    })
  })
  return formattedData
}

function formatTransactionsData(data) {
  const formattedData = []
  data.forEach((result) => {
    let transactionType = result.maker_type
    if (result.maker_type === 'kaup') {
      transactionType = 'buy'
    } else if (result.maker_type === 'sala') {
      transactionType = 'sell'
    }
    formattedData.push({
      id: result.id,
      amount_isk: result.amount,
      amount_aur: result.btc,
      rate: result.price,
      type: transactionType,
      timestamp: moment(result.timestamp * 1000).format('YYYY-MM-DDTHH:mm:ss'),
    })
  })
  return formattedData
}

function formatOrderBookData(data) {
  const formattedData = []
  data.forEach((result) => {
    formattedData.push({
      rate: result.price,
      order_amount_aur: result.order_amount,
      order_value_isk: result.order_value,
      timestamp: moment(result.timestamp * 1000).format('YYYY-MM-DDTHH:mm'),
    })
  })
  return formattedData
}

function standardErrorResponse(res) {
  return res.status(500).json({
    error: 'isx.is refuses to respond or give back data',
  })
}

app.get('/aur', (req, res) => {
  queryStats((error, response, data) => {
    if (error || response.statusCode !== 200) {
      return standardErrorResponse(res)
    }
    return res.cache(cacheTime).json(formatStatsData(data))
  })
})

app.get('/aur/history', (req, res) => {
  queryHistory((error, response, data) => {
    if (error || response.statusCode !== 200) {
      return standardErrorResponse(res)
    }
    return res.cache(cacheTime).json(formatHistoryData(data['historical-prices']))
  })
})

app.get('/aur/transactions', (req, res) => {
  queryTransactions((error, response, data) => {
    if (error || response.statusCode !== 200) {
      return standardErrorResponse(res)
    }
    return res.cache(cacheTime).json({
      results: formatTransactionsData(data.transactions.data),
      timestampApis: moment().format('YYYY-MM-DDTHH:mm:ss'),
    })
  })
})

app.get('/aur/order-book', (req, res) => {
  queryOrderBook((error, response, data) => {
    if (error || response.statusCode !== 200) {
      return standardErrorResponse(res)
    }
    return res.cache(cacheTime).json({
      ask: formatOrderBookData(data['order-book'].ask),
      bid: formatOrderBookData(data['order-book'].bid),
      timestampApis: moment().format('YYYY-MM-DDTHH:mm:ss'),
    })
  })
})
