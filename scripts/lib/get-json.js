const request = require('request-promise-native');
const csv = require('csvtojson');

const KEY = '14EX_2QTxfJyQAiN4rONSkQrY6Brb9Xajrcwl1CBwp2M';
const GOOGLE_URL = `https://docs.google.com/spreadsheets/d/${KEY}/pub?output=csv`;

module.exports = async function() {
  let rawData = await request.get(GOOGLE_URL);
  let json = await csv().fromString(rawData);
  json.splice(0, 1);
  return json
}
