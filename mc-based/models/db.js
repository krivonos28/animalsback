const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/animals';
const db = new MongoClient(url, { useNewUrlParser: true });

module.exports = db;
