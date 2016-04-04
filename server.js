#!/usr/bin/env node
/*eslint-env node */
/*eslint-disable no-console*/
'use strict'

// load server config, based on config.dist.json:
let config
try {
  config = require('./config.json')
} catch (err) {
  console.error(err)
  console.error('Cannot find configuration file. You must copy `config.dist.json` into `config.json` and edit it with your settings.')
  process.exit()
}

const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 3001
const environment = process.env.NODE_ENV || 'development'

const path = require('path')
const express = require('express')
const compression = require('compression')
const chalk = require('chalk')
const moment = require('moment')

const now = () => chalk.gray(moment().format('YYYY-MM-DD HH:mm:ss.SSS'))

const rollbar = require('rollbar')
if (config.rollbar_token) {
  rollbar.init(config.rollbar_token, {environment})
  rollbar.handleUncaughtExceptions()
} else {
  console.log(now(), chalk.yellow('Rollbar has not been initialized due to missing Project Access Token in config.'))
}

const app = express()
app.use(compression())

if (environment === 'development') {
  app.get('*', (req, res, next) => {
    const ip = req.headers['cf-connecting-ip'] || req.ip
    const country = req.headers['cf-ipcountry']
    console.log(now(), chalk.green(req.method + ' ' + req.url), chalk.gray('from ' + ip + (country ? ' (' + country + ')' : '')))
    next()
  })
}

app.use(express.static(path.join(__dirname, '/dist'), {index: false}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// catch-all error handler:
app.use((err, req, res, next) => {
  if (!res.headersSent) {
    res.status(500).send('Internal Server Error')
  }
  console.error(now(), chalk.red(err.stack || err))
  if (config.rollbar_token) {
    rollbar.handleError(err, req)
  }
})

const server = app.listen(PORT, () => {
  console.log(now(), chalk.blue('Listening on port ' + server.address().port + ' for ' + environment))
})
