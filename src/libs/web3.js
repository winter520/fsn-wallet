// const path = require("path").resolve(".")
// const pathLink = path

const Web3 = require('web3')
import config from '@/config/index'
// console.log(config)
let web3
try {
  // web3 = new Web3(new Web3.providers.HttpProvider('https://10.192.32.92'))
  web3 = new Web3(new Web3.providers.HttpProvider(config.serverURL))
} catch (error) {
  web3 = new Web3()
}
web3._extend({
  property: 'fsn',
  methods: [
    new web3._extend.Method({
      name: 'ticketPrice',
      call: 'fsn_ticketPrice',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getStakeInfo',
      call: 'fsn_getStakeInfo',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getBlockReward',
      call: 'fsn_getBlockReward',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'buyTicket',
      call: 'fsntx_buyTicket',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'allTickets',
      call: 'fsn_allTickets',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'allTicketsByAddress',
      call: 'fsn_allTicketsByAddress',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'totalNumberOfTickets',
      call: 'fsn_totalNumberOfTickets',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'totalNumberOfTicketsByAddress',
      call: 'fsn_totalNumberOfTicketsByAddress',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'assetToTimeLock',
      call: 'fsntx_assetToTimeLock',
      params: 6,
      inputFormatter: [null, null, null, null, null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'timeLockToTimeLock',
      call: 'fsntx_timeLockToTimeLock',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'timeLockToAsset',
      call: 'fsntx_timeLockToAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getTimeLockBalance',
      call: 'fsn_getTimeLockBalance',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getAllTimeLockBalances',
      call: 'fsn_getAllTimeLockBalances',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'genAsset',
      call: 'fsntx_genAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'decAsset',
      call: 'fsntx_decAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'incAsset',
      call: 'fsntx_incAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'sendAsset',
      call: 'fsntx_sendAsset',
      params: 4,
      inputFormatter: [null,null, null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getAllBalances',
      call: 'fsn_getAllBalances',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getLatestNotation',
      call: 'fsn_getLatestNotation',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'genNotation',
      call: 'fsntx_genNotation',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getNotation',
      call: 'fsn_getNotation',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getAddressByNotation',
      call: 'fsn_getAddressByNotation',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getAsset',
      call: 'fsn_getAsset',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getBalance',
      call: 'fsn_getBalance',
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'makeSwap',
      call: 'fsntx_makeSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getSwap',
      call: 'fsn_getSwap',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'takeSwap',
      call: 'fsntx_takeSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'recallSwap',
      call: 'fsntx_recallSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'makeMultiSwap',
      call: 'fsntx_makeMultiSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getMultiSwap',
      call: 'fsn_getMultiSwap',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'takeMultiSwap',
      call: 'fsntx_takeMultiSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'recallMultiSwap',
      call: 'fsn_recallMultiSwap',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'isAutoBuyTicket',
      call: 'fsntx_isAutoBuyTicket',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'startAutoBuyTicket',
      call: 'miner_startAutoBuyTicket',
      params: 0,
      inputFormatter: [],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'stopAutoBuyTicket',
      call: 'miner_stopAutoBuyTicket',
      params: 0,
      inputFormatter: [],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'getTransactionAndReceipt',
      call: 'fsn_getTransactionAndReceipt',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    }),
    new web3._extend.Method({
      name: 'allInfoByAddress',
      call: 'fsn_allInfoByAddress',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }),

    

  ]
})

web3._extend({
  property: "fsntx",
  methods: [
    new web3._extend.Method({
      name: "buildSendAssetTx",
      call: "fsntx_buildSendAssetTx",
      params: 1,
      inputFormatter: [web3._extend.formatters.inputTransactionFormatter]
    }),
  ]
})

export default web3