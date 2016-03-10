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

const autoprefixer = require('autoprefixer')
const reactCssModules = require('react-css-modules')

const htmlPlugin = new HtmlWebpackPlugin({
  template: 'app/index.tpl.html',
  title: user_config.title,
  description: user_config.description,
  url: user_config.url,
  image: user_config.url + '/img/logo.png',
  env: env,
  rollbar_token: user_config.rollbar_token,
  revision: revision,
})

const definePlugin = new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify(env)},
  __API_ENDPOINT__: JSON.stringify(user_config.api_endpoint),
  __RECAPTCHA_SITE_KEY__: JSON.stringify(user_config.recaptcha_site_key),
  __GOOGLE_API_KEY__: JSON.stringify(user_config.google_api_key),
  __DEBUG__: (env === 'development'),
})

const configs = {
  development: {
    debug: true,
    devtool: 'source-map', // eval
    plugins: [
      new CleanWebpackPlugin(['dist']),
      htmlPlugin,
      definePlugin,
    ],
  },
  production: {
    debug: false,
    devtool: 'cheap-module-source-map', // or even null for no sourcemap
    plugins: [
      htmlPlugin,
      definePlugin,
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
  },
}

const config = configs[env]

// common config:
Object.assign(config, {
  entry: './app/boot.js',
  output: {
    path: './dist',
    filename: env === 'development' ? 'app.js' : `${revision}.js`,
    publicPath: '/',
  },
  // eslint: {
  //   fix: true,
  // },
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
        exclude: /node_modules/,
        loaders: [
          'style', // understand css
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // prefix css rules
          'postcss-loader', // autoprefixer etc (see postcss method below)
        ],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /(node_modules|\/static\/)/,
        loaders: [
          'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
        ],
      },
      {
        test: /\/static\//,
        exclude: /\.js$/,
        loaders: [
          'file-loader?name=[name].[ext]', // simple copy from app/static/ to dist/
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
