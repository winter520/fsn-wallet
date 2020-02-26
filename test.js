// const path = require('path').resolve('.')
// const web3 = require(path + '/src/libs/web3')
const Web3 = require('web3')
// const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.fsn.dev/api'))
const web3 = new Web3(new Web3.providers.HttpProvider('https://fsn.dev/api'))
// console.log(web3.isConnected())
web3.eth.getBlock('latest', (err, res) => {
  if (err) {
    console.log(err)
    // reject(false)
  } else {
    console.log(res)
    // resolve(true)
  }
})