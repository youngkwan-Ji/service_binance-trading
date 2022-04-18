const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.bswapClaimedHistory({ poolId: 52, assetRewards: 'BNB', type: 1 })
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
