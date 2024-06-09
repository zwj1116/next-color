// 打包环境配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin  = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';
const { WebUpdateNotificationPlugin } = require('@plugin-web-update-notification/webpack');
const timestamp = new Date().getTime();

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = merge(baseConfig, {
  mode: 'production',
  // 打包文件出口
  output: {
    path: resolve(`../${ASSET_PATH}`),
    filename: `static/js/[name].${timestamp}.js`,
    clean: true,// 在生成文件之前清空 output 目录
    publicPath: `/`,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `static/css/[name].${timestamp}.css`
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: '[path][base].gz',
      algorithm: 'gzip',
      threshold: 10240, // 只有大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve('../public'),
          to: resolve(`../${ASSET_PATH}`),
          filter: source => {
            return !source.includes('index.html')
          }
        },
      ],
    }),
    new WebUpdateNotificationPlugin({
      versionType: 'build_timestamp',
      logVersion: true,
      // polling interval（ms）
      checkInterval: 60 * 1000,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: resolve('../public/libpag.wasm'),
    //       to: resolve(`../${ASSET_PATH}/static/js/`),
    //     },
    //   ],
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({ // 压缩js
        parallel: true, // 开启多线程压缩
        extractComments: false, // 去除打包时产生的txt
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"] // 删除console.log
          }
        }
      }),
    ],
    splitChunks: { // 分隔代码
      chunks: 'all',
      minSize: 3000, // （默认值：30000）块的最小大小。
      maxAsyncRequests: 5, //（默认值为5）按需加载时并行请求的最大数量
      maxInitialRequests: 6, // （默认值为3）入口点的最大并行请求数
      automaticNameDelimiter: '-',
      cacheGroups: {
        'vue-router': {
          name: 'vue-router',
          test: /[\\/]node_modules[\\/]_?vue-router(.*)/,
        },
        'ant-design-vue': {
          name: 'ant-design-vue',
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
        },
        echarts: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/]_?echarts(.*)/,
        },
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/]_?@vue(.*)/,
        },
      },
    }
  },
})
