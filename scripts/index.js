#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const aws = require('aws-sdk');
const getJSON = require('./lib/get-json.js');

const ENV = process.env.ENV;
const s3 = new aws.S3();

getJSON().then(json => {
  if (['prod', 'staging'].includes(ENV)) {
    s3.putObject({
      Body: Buffer.from(JSON.stringify(json)),
      Bucket: process.env.AWS_BUCKET,
      Key: process.env.AWS_PREFIX,
      ACL: 'public-read',
      ContentType: 'application/json',
      Expires: 0
    }).promise()
    .then(() => console.log('success')); // eslint-disable-line
  } else {
    fs.writeFileSync(path.join(__dirname, '..', 'server/data/guide.json'), JSON.stringify(json));
  }
});
