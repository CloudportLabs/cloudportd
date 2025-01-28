const Keyv = require('keyv');
const db = new Keyv('sqlite://cloudportd.db');

module.exports = { db }