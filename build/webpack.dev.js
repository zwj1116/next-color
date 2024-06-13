// 开发环境配置
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 8080,
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    proxy: {
      '/yk': {
        // target: 'http://47.116.221.59:9999',
        target: 'http://127.0.0.1:9999',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/yk': '',
        },
      },
    },
    client: {
      overlay: false,
    }
  }
})
