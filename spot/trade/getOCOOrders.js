const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

client.getOCOOrders({
  limit: 100
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
