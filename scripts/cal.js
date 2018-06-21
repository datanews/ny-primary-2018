#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const aws = require('aws-sdk');
const moment = require('moment-timezone');
const ical = require('ical-generator');

const s3 = new aws.S3();

moment.tz.setDefault('America/New_York');

function createICal(content) {
  content = content || '';

  const cal = ical();
  const date = moment({year: 2018, month: 5, day: 26});
  cal.createEvent({
    start: date.hour(6).toDate(),
    end: date.hour(21).toDate(),
    summary: content
  });

  return cal;
}

function writeOut(string, filename) {
  let dest = path.join('.', filename);
  fs.writeFileSync(dest, string);
}

function uploadToS3(string, filename) {
  let Body = zlib.gzipSync(Buffer.from(string));
  return s3.putObject({
    Body,
    Bucket: process.env.AWS_BUCKET,
    Key: `${process.env.AWS_PREFIX}/assets/${filename}`,
    ACL: 'public-read',
    ContentType: 'text/calendar',
    ContentEncoding: 'gzip',
    Expires: 0
  }).promise();
}

function main() {
  const filename = `${process.env.CAL_FILENAME || 'primary'}.ics`;
  const cal = createICal(process.env.CAL_CONTENT);
  writeOut(cal.toString(), filename);
  console.log(filename, 'written to cwd'); // eslint-disable-line
  uploadToS3(cal.toString(), filename)
    .then(() => console.log(filename, 'uploaded to S3')); // eslint-disable-line
}

main();
