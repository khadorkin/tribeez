/*eslint-env node*/
/*eslint-disable no-console*/
'use strict'

let user_config
try {
  user_config = require('./config.json')
} catch (err) {
  console.error(err.toString())
  console.error('Could not load configuration file. You must copy `config.dist.json` into `config.json` and edit it with your settings.')
  process.exit()
}

const execSync = require('child_process').execSync
const revision = execSync('git rev-parse HEAD', {cwd: __dirname}).toString().trim()

const env = process.env.NODE_ENV || 'development'
console.log('Building for', env)

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const autoprefixer = require('autoprefixer')
const reactCssModules = require('react-css-modules')

const configs = {
  development: {
    debug: true,
    devtool: 'eval',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  },
  production: {
    debug: false,
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
  },
}

const config = configs[env]

// common config:
Object.assign(config, {
  entry: './src/web/boot.js',
  output: {
    path: './dist',
    filename: env === 'development' ? 'app.js' : `${revision}.js`,
    publicPath: '/',
    pathinfo: (env === 'development'),
  },
  plugins: config.plugins.concat([
    new HtmlWebpackPlugin({
      template: 'src/web/index.tpl.html',
      title: user_config.title,
      description: user_config.description,
      url: user_config.url,
      twitter: user_config.twitter,
      image: user_config.url + '/logo.png',
      env: env,
      rollbar_token: user_config.rollbar_token,
      ga_id: user_config.ga_id,
      revision: revision,
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(env)},
      __API_ENDPOINT__: JSON.stringify(user_config.api_endpoint),
      __RECAPTCHA_SITE_KEY__: JSON.stringify(user_config.recaptcha_site_key),
      __GOOGLE_API_KEY__: JSON.stringify(user_config.google_api_key),
      __TELEGRAM_BOT_NAME__: JSON.stringify(user_config.telegram_bot_name),
      __FB_APP_ID__: JSON.stringify(user_config.facebook_app_id),
      __FB_PAGE_ID__: JSON.stringify(user_config.facebook_page_id),
      __DEBUG__: (env === 'development'),
    }),
    new webpack.IgnorePlugin(/\.(android|ios)\.js/),
    new CopyWebpackPlugin([
      {from: 'src/web/static'},
    ]),
  ]),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel', // ES6
          'eslint-loader', // JS linter
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules|index\.css/,
        loaders: [
          'style', // understand css
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // prefix css rules and put the result in a <style> tag
          'postcss-loader', // autoprefixer etc (see postcss method below)
        ],
      },
      {
        test: /node_modules\/.+\.css|index\.css$/,
        loaders: [
          'style', // understand css
          'css-loader', // simply put it in a <style> tag
        ],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loaders: [
          'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
          'svg-react', // inline SVGs into React components
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: [
          'json-loader',
        ],
      },
    ],
  },
  postcss: function() {
    return [
      autoprefixer, // for cross browser compatibility of experimental rules
      reactCssModules, // css rules are prefixed with the React component name
    ]
  },
})

module.exports = config
