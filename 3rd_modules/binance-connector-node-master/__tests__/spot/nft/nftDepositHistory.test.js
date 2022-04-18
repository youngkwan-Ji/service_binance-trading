/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, startTime, endTime, limit, recvWindow } = require('../../testUtils/mockData')
const parameters = {
  startTime,
  endTime,
  limit,
  recvWindow
}

describe('#nftDepositHistory', () => {
  it('should fetch NFT deposit history', () => {
    nockMock(`/sapi/v1/nft/history/deposit?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.nftDepositHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
