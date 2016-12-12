const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postCSSImport = require('postcss-import');
const postCSSNested = require('postcss-nested');
const postCSSNext = require('postcss-cssnext');
const postCSSSimpleVars = require('postcss-simple-vars');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../web/index.js')
  ],
  output: { 
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  postcss: function plugins(wp) {
    return [
      postCSSImport({ addDependencyTo: wp }),
      postCSSSimpleVars({ silent: true }),
      postCSSNested(),
      postCSSNext(),
    ];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'web/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"],
        "plugins": ["transform-decorators-legacy"]
      }
    }, 
    {
      test: /\.json?$/,
      loader: 'json'
    }, 
    {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[local]'
    },
    {
      test: /(\.scss)$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
      ],
    }]
  }
};