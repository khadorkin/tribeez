#!/usr/bin/env node
/*eslint-env node */
'use strict'

const PORT = process.env.PORT || 3000
const path = require('path')
const express = require('express')
const compression = require('compression')

//const webpack = require('webpack')
//const webpackMiddleware = require('webpack-dev-middleware')
//const config = require('./webpack.config.js')

var app = express()
app.use(compression())

//var compiler = webpack(config)
//app.use(webpackMiddleware(compiler))

app.use(express.static(__dirname + '/dist'))

app.get('*', function response(req, res) {
  console.log(req.method + ' ' + req.url)
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT)
console.log('Listening on port ' + PORT)
