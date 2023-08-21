const mysql = require('mysql2/promise');
const pool = mysql.createPool({host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom'
})

// get all
async function getAll() {
    return await pool.query('select * from product');
}
async function getOne(id) {
    return await pool.query('select * from product where id = ' + id);
}
async function insert(title,qt,price,img = null){
    return await pool.query('insert into product(title,qt,price,img) values(?,?,?,?)',[title,qt,price,img]);
}

async function deleteOne(id) {
    return pool.query('delete from product where id = ' + id);
}

async function updateOne({id, title, qt, price}) {
    return pool.query('update product set title = ? , qt = ? , price = ? where id = ?',
    [title, qt, price, id]);
}

module.exports = {getAll, getOne, insert, deleteOne, updateOne}