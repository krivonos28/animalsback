const mysql = require ('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpasswordgiven',
    database: 'productsdb',
    port: 3306
});
connection.connect();
module.exports.connection = connection;
