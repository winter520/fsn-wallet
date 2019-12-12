export default {
  // serverURL: 'https://www.myfusionwallet.com',
  // serverURL: 'http://3.16.110.25:9001',
  // serverURL: '/api',
  serverURL: localStorage.getItem('network') ? localStorage.getItem('network') : 'https://fsn.dev/api',
  // serverURL: 'https://testnet.fsn.dev/api',
}