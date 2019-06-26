const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const vendors = [
  'vue/dist/vue.esm.js',
  'vuex',
  'vue-router',
  'axios',
];

const entryName = isProd ? 'vendors' : 'vendors_debug';
const plugins = [
  new CleanWebpackPlugin([
    `${entryName}.dll.js`,
  ], {
    root: path.resolve(__dirname, '../dist'),
  }),
  new webpack.DllPlugin({
    context: __dirname,
    name: '[name]_library',
    path: path.join(__dirname, `${entryName}.manifest.json`),
  }),
];
if (isProd) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
}

module.exports = {
  entry: {
    [entryName]: vendors,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  mode: 'none',
  optimization: {
    minimize: isProd,
  },
  plugins,
};

