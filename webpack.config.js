/*eslint-env node */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const autoprefixer = require('autoprefixer')
const reactCssModules = require('react-css-modules')

const configs = {
  development: {
    devtool: 'eval',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'MyTribe',
        template: 'app/index.tpl.html',
      }),
    ],
  },
  production: {
    devtool: 'cheap-module-source-map', // or even null for no sourcemap
    plugins: [
      new HtmlWebpackPlugin({
        title: 'MyTribe',
        template: 'app/index.tpl.html',
      }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(env) } }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ],
  },
}
const env = process.env.NODE_ENV || 'development'

const config = configs[env]

// common config:
Object.assign(config, {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
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
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'babel!svg-react',
      },
    ],
  },
  postcss: function () {
    return [autoprefixer, reactCssModules]
  },
})

module.exports = config
