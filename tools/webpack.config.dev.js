const path = require('path');
const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Helper = require('./webpackHelper');

const dist = process.env.BUILD_DEST || 'build';

// 收集入口文件
var entries = {
  vendor: ['react-router-redux', 'react-router', 'history', 'redux', 'react-redux', 'redux-thunk',
    'lodash', 'classnames', 'isomorphic-fetch'],
  devServerClient: 'webpack-dev-server/client?http://127.0.0.1:8088',
};
var glob = require("glob");
var entryFiles = glob.sync("./src/pages/**/entry.js");
entryFiles = entryFiles.map((entryFilePath) => {
  return entryFilePath.replace(/^\.\/src\//, ''); // because webpack context set src;
});

var pageEntries = Helper.generateEntries(entryFiles);

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
  }),
].concat(Helper.genarateHtmlPlugins(entryFiles));

const cssmodule = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
module.exports = {
  context: path.resolve(__dirname, '../src'),
  devtool: 'cheap-eavl-source-map',
  entry: _.assign({}, entries, pageEntries),
  output: {
    path: path.resolve(__dirname, `../${dist}`),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
    }, {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        cssmodule,
        'sass?sourceMap',
        'postcss',
      ],
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml',
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, '../src'),
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['url?limit=8192'],
      exclude: /node_modules/,
    }],
  },
  postcss() {
    return [autoprefixer];
  },
  devServer: {
    contentBase: `./${dist}`,
    hot: true,
    port: 8088,
    proxy: {
      '/alid/*': {
        target: 'http://112.124.132.78',
        host: 'clouddata-test.dingtalkapps.com',
      },
    },
  },
};
