const path = require('path')
const fs = require('fs')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const BASE_URL = './'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@s', resolve('src/static'))
      .set('@p', resolve('src/pages'))
  },
  productionSourceMap: false,
  configureWebpack: (config)=>{
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 去除console
      config.plugins.push( // 压缩gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/scss/index.scss";
        `
      }
    }
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '8080',
    https: false,
    hotOnly: false, 
    proxy: {
      '/api': {
        target: 'https://whallet.net', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/api': ''
        }
      }
    },
  }
}