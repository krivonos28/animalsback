const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url, { useNewUrlParser: true })

let connection;
let connect = () => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if(!err) {
                connection = client.db("animals");
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

let getConnection = () => {
    return connection;
};

module.exports.connect = connect;
module.exports.getConnection = getConnection;



// function (err, client){
//     const col = client.db(dbName).collection('animals');
//     console.log(col)
//     return col;
// })
// const db = client.connect((err)=> {
//     if (err) console.log("er -------- ",err)
//     console.log('good---------')
// });



