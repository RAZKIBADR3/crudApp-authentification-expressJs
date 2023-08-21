const mysql = require('mysql2/promise');
const pool = mysql.createPool({host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom'
})

async function getOne(username, password) {
    const data = await pool.query('select * from users where username = ? and password = ?',[username,password]);
    return data[0];
}

module.exports = {getOne}