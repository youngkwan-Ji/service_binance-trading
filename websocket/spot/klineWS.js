const { Console } = require('console')
const env = require('config/env');
const fs = require('fs')
const Spot = require('services/binance/3rd_modules/binance-connector-node-master/src/spot')

const output = fs.createWriteStream('./stdout.log')
const errorOutput = fs.createWriteStream('./stderr.log')
const logger = new Console({
  stdout: output,
  stderr: errorOutput
})

// setTimeout(() => client.unsubscribe(wsRef), 5000)
// check the output file
function onOpen(){
  console.log("OPEN klineWS")
}

function onClose(){
  console.log("CLOSE klineWS")
}

function onMessage(data){
  // String.
  // console.log(String(data))
}



module.exports = (callback) => {
  const client = new Spot(env.BINANCE_API_KEY, env.BINANCE_SECRET_KEY, {
    logger
  })

  const callbacks = {
    open: () => onOpen(),
    close: () => onClose(),
    message: data => {
      // console.log((typeof callback))
      callback(data)
      // if ((typeof onData) == "function"){
      //   console.log("ddd")
      //   onData(data)
      // }
      onMessage(data)
    }
  }

  const wsRef = client.klineWS('BTCUSDT', '1m', callbacks)
}