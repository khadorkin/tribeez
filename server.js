#!/usr/bin/env node

'use strict'

const PORT = 3001
const path = require('path')
const express = require('express')
//const webpack = require('webpack')
//const webpackMiddleware = require('webpack-dev-middleware')
//const config = require('./webpack.config.js')

var app = express()
//var compiler = webpack(config)

app.use(express.static(__dirname + '/dist'))
//app.use(webpackMiddleware(compiler))
app.get('*', function response(req, res) {
  console.log(req.method + ' ' + req.url)
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT)
console.log('Listening on port ' + PORT)
