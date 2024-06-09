// 公共配置
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require("eslint-webpack-plugin");
const timestamp = new Date().getTime();

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  mode: "none",
  entry: resolve("../src/main.ts"),
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      inject: true,
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // 是否开启 options API
      __VUE_PROD_DEVTOOLS__: false // 生产环境是否支持DEVTOOLS
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false,
        filepath: '../.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      dts: '../src/types/auto-import.d.ts',
    }),
    new ESLintPlugin({ extensions: ["js", "ts", "vue"] })
  ],
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
    alias: {
      'url': false,
      '@': resolve('../src'),
      '@images': resolve('../src/assets/images'),
      '@icons': resolve('../src/assets/icons'),
    },
    extensions: ['.vue', '.ts', '.js', '.json'],
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['thread-loader','vue-loader'], 
        include: [resolve( '../src')],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'svg-sprite-loader',
          options: { symbolId: 'icon-[name]' }
        }],
        include: [resolve( '../src')],
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'thread-loader',
        },{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-typescript",
                {
                  allExtensions: true,
                },
              ],
            ]
          }
        }],
        include: [resolve( '../src')],
      },
      {
        test:  /\.css$/,
        // 执行顺序是从右到左
        use: [ isDev ? 'style-loader' : MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [ isDev ? 'style-loader' : MiniCssExtractPlugin.loader,'css-loader', {
          loader: 'less-loader',
          options: {
            lessOptions: {},
          }
        }]
      },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        include: [resolve( '../src')],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位，减少网络请求数
          }
        },
        generator:{
          filename:`static/images/[name].${timestamp}[ext]`, // 文件输出目录和命名
        },
      },
    ]
  },
};
