// import cookie from './cookie'
import tools from './tools'
import web3 from './web3'
import wallet from './wallet'
import config from '@/config/index'
// console.log(config)
export default {
  // ...cookie,
  ...config,
  ...tools,
  web3,
  wallet
}