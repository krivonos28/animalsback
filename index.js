const db = require('./models/db');
const Application = require('./app');

db.connect()
    .then(() => {
        let app = new Application();
        console.log('Connected successfully to server');
    })
    .catch((e) => {
        console.log(e);
    });