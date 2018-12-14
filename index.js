const db = require('./models/model-mongo/db');
const Application = require('./app');

db.connect()
    .then(() => {
        let app = new Application();
        
        console.log('Connected successfully to server');
    })
    .catch((e) => {
        console.log(e);
    });