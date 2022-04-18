/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#tickerPrice', () => {
  it('should return all ticker price', () => {
    nockMock('/api/v3/ticker/price')(mockResponse)

    return SpotClient.tickerPrice().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return ticker price', () => {
    const symbol = 'BTCUSDT'
    nockMock(`/api/v3/ticker/price?symbol=${symbol}`)(mockResponse)

    return SpotClient.tickerPrice(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
