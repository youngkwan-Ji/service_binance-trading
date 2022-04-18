const env = require('config/env');
const Spot = require('services/binance/3rd_modules/binance-connector-node-master/src/spot')
const commonFs = require('modules/commonFs')
const moment = require('modules/moment')

const client = new Spot(env.BINANCE_API_KEY, env.BINANCE_SECRET_KEY, {
    // baseURL: 'http://testnet.binance.vision'
})

function saveKlinesDataToCSV(response){
    var res = response.data.map(function (obj){
        obj[0] = moment(new Date(obj[0])).format('yyyyMMDDHHmmss')
        obj[6] = moment(new Date(obj[6])).format('yyyyMMDDHHmmss')
        return obj
    })
    var startTime = res[0][0]
    var endTime = res[res.length - 1][0]
    res.unshift(['openTime'
        , 'open'
        , 'high'
        , 'low'
        , 'close'
        , 'volume'
        , 'closeTime'
        , 'quoteAssetVolume'
        , 'numberOfTrades'
        , 'takerBuyBaseAssetVolume'
        , 'takerBuyQuoteAssetVolume'
        , 'ignore'])
    var fileNm = './resource/dataset/binance/klines-BTCUSDT-1m_' + startTime + "_" + endTime
    commonFs.saveArrayToCSV(fileNm, res)
}

function getKlinesData() {
    const GET_YEAR = 2022
    const GET_START_MONTH = 1
    const GET_END_MONTH = 4

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const PM_TIME_DIFF = 12 * 60 * 60 * 1000;

    for (var i = GET_START_MONTH; i <= GET_END_MONTH; i++) {
        const days = new Date(GET_YEAR, i, 0).getDate()
        console.log(days)

        for (var j = 1; j <= days; j++) {

            if (i == 4 && j >= 18){
                return
            }
            var startString = '' + GET_YEAR + '-' + i + '-' + j + ' ' + '00:00:00'
            var endString = '' + GET_YEAR + '-' + i + '-' + j + ' ' + '11:59:00'

            var amStartTime = new Date(startString).getTime() + KR_TIME_DIFF
            var amEndTime = new Date(endString).getTime() + KR_TIME_DIFF
            var pmStartTime = new Date(startString).getTime() + KR_TIME_DIFF + PM_TIME_DIFF
            var pmSndTime = new Date(endString).getTime() + KR_TIME_DIFF + PM_TIME_DIFF


            client.klines('BTCUSDT', '1m', {limit: 1000, startTime: amStartTime, endTime: amEndTime}).then(response => {
                saveKlinesDataToCSV(response)
            }).catch(error =>
                console.log(error.message)
            )

            client.klines('BTCUSDT', '1m', {limit: 1000, startTime: pmStartTime, endTime: pmSndTime}).then(response => {
                saveKlinesDataToCSV(response)
            }).catch(error =>
                console.log(error.message)
            )
        }
    }
}
// var startTime = new Date(1649467920000)
// console.log(moment(startTime).format('yyyyMMDDHHmmss'))

getKlinesData()
// client.klines('BTCUSDT', '1m', { limit: 1000,startTime:startTime,endTime:endTime  }).then(response => {
//     console.log(response.data)
//     var a = new Date(response.data[0][0])
//     console.log(a)
//     var b = new Date(response.data[response.data.length - 1][0])
//     console.log(b)
//     response.data.unshift(['openTime'
//         , 'open'
//         , 'high'
//         , 'low'
//         , 'close'
//         , 'volume'
//         , 'closeTime'
//         , 'quoteAssetVolume'
//         , 'numberOfTrades'
//         , 'takerBuyBaseAssetVolume'
//         , 'takerBuyQuoteAssetVolume'
//         , 'ignore'])
//     var fileNm = './resource/dataset/binance/klines-BTCUSDT-1m_'
//     commonFs.saveArrayToCSV(fileNm,response.data)
//     // client.logger.log(response.data)
//   }).catch(error =>
//     // client.logger.error(error.message)
//     console.log(error.message)
//
//   )
