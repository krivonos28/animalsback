const mysql = require ('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpasswordgiven',
    database: 'productsdb',
    port: 3306
});
connection.connect();
const selectUsers = () =>{
connection.query("SELECT * FROM customers", function (err,rows, fields){
    if (err) throw err;
    console.log(rows);
});
}
const insertUsers = (age) =>{

    console.log(age)
    let sql ='INSERT INTO customers (`age`, `firstname`, `lastname`, `phone`) VALUES  ("'+ age +'",  "firstname", "lastname", "p1asdf2312e1gxrw")';
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log(res);
})
}

const deleteUser = () => {
    let sql = 'DELETE FROM customers WHERE id = 17';
    connection.query (sql, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
}
const updateUser = () => {
    let sql = "UPDATE customers SET firstname = 'Chack' WHERE id = 11";
    connection.query (sql, (err, res) => {
        if (err) console.log(err);
        console.log(res);
    })
}
//insertUsers(123452);
//deleteUser();
updateUser();
selectUsers();

connection.end();
