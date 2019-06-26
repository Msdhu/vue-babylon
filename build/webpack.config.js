const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcsspxtoviewport = require('postcss-px-to-viewport');
const { VueLoaderPlugin } = require('vue-loader');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  mode: 'development',
  context: ROOT_PATH,
  entry: {
    app: path.resolve(ROOT_PATH, 'src/app.js'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: BUILD_PATH,
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': ROOT_PATH,
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      minSize: 0,
      chunks: 'all',
    }
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    inline: true,
    hot: true,
    progress: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
                postcsspxtoviewport({
                  viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度, 一般是750
                  viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定, 一般指定1334, 也可以不配置
                  unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数(很多时候无法整除)
                  viewportUnit: 'vw',   // 指定需要转换成的视窗单位, 建议使用vw
                  selectorBlackList: ['.ignore-vw', '.hairlines'],  // 指定不转换为视窗单位的类
                  minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位, 可以自定义
                  mediaQuery: false,    // 允许在媒体查询中转换`px`
                }),
              ],
            },
          },
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(ROOT_PATH, 'src/styles/border.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: '[name].[ext]?[hash:8]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname, // 与dll.config.js中 webpack.DllPlugin的context一致
      manifest: path.join(__dirname, 'vendors_debug.manifest.json'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
    }),
    new InlineManifestWebpackPlugin('runtime'),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(BUILD_PATH, 'vendors_debug.dll.js'),
      // 关闭默认的source-map
      includeSourcemap: false,
    }),
  ],
  devtool: 'inline-source-map',
};
