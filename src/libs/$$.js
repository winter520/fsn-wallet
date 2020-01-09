// import cookie from './cookie'
import tools from './tools'
import web3 from './web3'
// import wallet from './wallet'
import wallet from 'ethereumjs-wallet'
import config from '@/config/index'
// console.log(config)
export default {
  // ...cookie,
  ...config,
  ...tools,
  web3,
  wallet,
  getWalletFromPrivKeyFile (strjson, password) {
    var jsonArr = JSON.parse(strjson);
    if (jsonArr.encseed != null) return wallet.fromEthSale(strjson, password)
    else if (jsonArr.Crypto != null || jsonArr.crypto != null) return wallet.fromV3(strjson, password, true)
    else
      throw 'Keystore is error!'
  },
  isConnected () {
    return new Promise((resolve, reject) => {
      try {
        web3.eth.getBlock('latest', (err, res) => {
          if (err) {
            reject(false)
          } else {
            // console.log(res)
            resolve(true)
          }
        })
      } catch (error) {
        reject(false)
      }
    })
  }
}