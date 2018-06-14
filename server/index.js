/* eslint-env node */
'use strict';
const express = require('express');
const morgan = require('morgan');
const path = require('path');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use('/data', express.static(path.resolve(__dirname, 'data')));
};
