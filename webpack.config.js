/*eslint-env node */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const autoprefixer = require('autoprefixer')
const reactCssModules = require('react-css-modules')

module.exports = {
  devtool: 'eval',
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MyTribe',
      template: 'app/index.tpl.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' ,
      },
    ],
  },
  postcss: function () {
    return [autoprefixer, reactCssModules]
  },
}
