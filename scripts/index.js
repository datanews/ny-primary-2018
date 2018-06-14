#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// const aws = require('aws-sdk');
const getJSON = require('./lib/get-json.js');

const ENV = process.env.ENV;

console.log('looking for json');
getJSON().then(json => {
  console.log('receieved', json.length);

  if (ENV === 'prod') {
    // ship to s3
  } else {
    console.log('writing out');
    fs.writeFileSync(path.join(__dirname, '..', 'server/data/guide.json'), JSON.stringify(json));
  }
});
