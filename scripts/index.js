#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const aws = require('aws-sdk');
const getJSON = require('./lib/get-json.js');

const ENV = process.env.ENV;
const s3 = new aws.S3();

getJSON().then(json => {
  if (['prod', 'staging'].includes(ENV)) {
    let Body = zlib.deflateSync(Buffer.from(JSON.stringify(json)));
    s3.putObject({
      Body,
      Bucket: process.env.AWS_BUCKET,
      Key: `${process.env.AWS_PREFIX}/data/guide.json`,
      ACL: 'public-read',
      ContentType: 'application/json',
      ContentEncoding: 'gzip',
      Expires: 0
    }).promise()
    .then(() => console.log('success')); // eslint-disable-line
  } else {
    let dest = path.join(__dirname, '..', 'server/data/guide.json');
    try {
      fs.writeFileSync(dest, JSON.stringify(json));
    } catch(e) {
      // does not exist, create
      fs.mkdirSync(dest);
      fs.writeFileSync(dest, JSON.stringify(json));
    }
  }
});
