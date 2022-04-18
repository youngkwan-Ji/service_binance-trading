/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#isolatedMarginTier', () => {
  const parameters = {
    tier: '1',
    recvWindow
  }
  it('throw MissingParameterError when missing symbol', () => {
    expect(() => {
      SpotClient.isolatedMarginTier('', parameters)
    }).toThrow(MissingParameterError)
  })

  it('should get isolated margin tier data', () => {
    nockMock(`/sapi/v1/margin/isolatedMarginTier?${buildQueryString({ symbol, ...parameters })}`)(mockResponse)

    return SpotClient.isolatedMarginTier(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
