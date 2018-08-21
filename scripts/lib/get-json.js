const request = require('request-promise-native');
const csv = require('csvtojson');

const KEY = process.env.GOOGLE_SHEET_ID;
const GOOGLE_URL = `https://docs.google.com/spreadsheets/d/${KEY}/pub?output=csv`;

module.exports = async function() {
  let rawData = await request.get(GOOGLE_URL);
  let json = await csv().fromString(rawData);
  json.splice(0, 1);
  return json
}
