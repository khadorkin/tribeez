#!/usr/bin/env node
/*eslint-env node */
/*eslint-disable no-console*/
'use strict'

const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 3001

const path = require('path')
const express = require('express')
const compression = require('compression')
// for logging:
const chalk = require('chalk')
const moment = require('moment')

const app = express()
app.use(compression())

app.use(express.static(path.join(__dirname, '/dist'), {index: false}))

app.get('*', (req, res) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  const ip = req.headers['cf-connecting-ip'] || req.ip
  const country = req.headers['cf-ipcountry']
  console.log(chalk.gray(now), chalk.green(req.method + ' ' + req.url), chalk.gray('from ' + ip + (country ? ' (' + country + ')' : '')))
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT)
console.log(chalk.blue('Listening on port ' + PORT))
