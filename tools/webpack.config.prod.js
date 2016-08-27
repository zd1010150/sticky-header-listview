const path = require('path');
const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Helper = require('./webpackHelper');

process.env.NODE_ENV = 'production'; // disable bable transform !!!
const dist = process.env.BUILD_DEST || 'build';

var assetsFileName = 'assets';
const branch = process.env.BUILD_GIT_BRANCH;
if (branch) {
  const splitIndex = branch.lastIndexOf('/');
  assetsFileName = `assets-${branch.slice(splitIndex + 1)}`;
}

var publicPath = '/';
if (branch) {
  var BUILD_GIT_GROUP = process.env.BUILD_GIT_GROUP;
  var BUILD_GIT_PROJECT = process.env.BUILD_GIT_PROJECT;
  if (/^daily/i.test(branch)) {
    publicPath = `//g-assets.daily.taobao.net/${BUILD_GIT_GROUP}/${BUILD_GIT_PROJECT}/`;
  } else if (/^publish/i.test(branch)) {
    publicPath = `//g.alicdn.com/${BUILD_GIT_GROUP}/${BUILD_GIT_PROJECT}/`;
  }
}

// 收集入口文件
var entries = {
  vendor: ['react-router-redux', 'react-router', 'history', 'redux', 'react-redux', 'redux-thunk',
    'lodash', 'classnames', 'isomorphic-fetch'],
};
var glob = require("glob");
var entryFiles = glob.sync("./src/pages/**/entry.js");
entryFiles = entryFiles.map((entryFilePath) => {
  return entryFilePath.replace(/^\.\/src\//, ''); // because webpack context set src;
});

var pageEntries = Helper.generateEntries(entryFiles, true);

var plugins = [
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  new AssetsPlugin({ filename: `${dist}/${assetsFileName}.json`, update: true }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
].concat(Helper.genarateHtmlPlugins(entryFiles, true));

const cssmodule = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';
module.exports = {
  context: path.resolve(__dirname, '../src'),
  devtool: 'cheap-source-map',
  entry: _.assign({}, entries, pageEntries),
  output: {
    path: path.resolve(__dirname, `../${dist}`),
    filename: '[name].[chunkhash:8].js',
    publicPath: publicPath,
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
      loader: ExtractTextPlugin.extract('style', 'css', 'postcss'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style?sourceMap',
        `${cssmodule}!sass?sourceMap`,
        'postcss'
      ),
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
      loaders: ['url?limit=8192&name=[path][name].[hash:8].[ext]'],
      exclude: /node_modules/,
    }],
  },
  postcss() {
    return [autoprefixer];
  },
};
