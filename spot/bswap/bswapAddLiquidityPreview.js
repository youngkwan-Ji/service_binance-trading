const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.bswapAddLiquidityPreview(2, 'SINGLE', 'USDT', 0.01)
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
