const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.subAccountList(
  {
    email: 'alice@test.com',
    isFreeze: false,
    page: 1,
    limit: 100
  }
).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
