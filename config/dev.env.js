'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"http://mch.apidev.lovecantouch.com"'
  API_URL: '"https://mch.api.lovecantouch.com"'
})
