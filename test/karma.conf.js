const path = require('path');
const autoprefixer = require('autoprefixer');

process.env.NODE_ENV = 'test'; // for bable!!!!

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    './src/**/*.spec.js',
  ],
  exclude: ['node_modules'],
  singleRun: false,
  frameworks: ['mocha', 'chai'],
  plugins: [
    'karma-webpack',
    'karma-mocha',
    'karma-coverage',
    'karma-chai',
    'karma-sourcemap-loader',
    'karma-chrome-launcher',
  ],
  reporters: ['progress', 'coverage'],
  preprocessors: {
    './src/**/*.spec.js': ['webpack', 'sourcemap'],
  },
  browsers: ['Chrome'],

  webpack: {
    context: path.resolve(__dirname, '../src'),
    devtool: 'cheap-module-source-map',
    resolve: {
      root: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../src'),
      ],
      extensions: ['', '.js', '.jsx', '.json'],
      alias: {
        sinon: 'sinon/pkg/sinon.js',
      },
    },
    module: {
      noParse: [
        /\/sinon\.js/,
      ],
      loaders: [{
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
      }, {
        test: /\.scss$/,
        loaders: ['style?sourceMap', 'css', 'sass?sourceMap', 'postcss'],
      }, {
        test: /\.json$/,
        loader: 'json',
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
        include: /src|test/,
        exclude: /node_modules/,
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url?limit=8192'],
        exclude: /node_modules/,
      }],
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
    },
    postcss() {
      return [autoprefixer];
    },
  },

  webpackMiddleware: {
    noInfo: true,
  },
  coverageReporter: {
    reporters: [{
      type: 'text',
    }, {
      type: 'lcov',
      dir: 'coverage',
    }],
  },
};


// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
