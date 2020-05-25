// get the client
const mysql = require('mysql2/promise');

// create pool to db
const pool = mysql.createPool({
    host: '207.154.222.88',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'biglers_biler',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

async function getUserByUsername(username) {
    try {
        console.log(pool.pool.config)
        console.log("_________________________________")
        const [rows, fields] = await pool.execute('SELECT * FROM user where username =?', [username]);
        return rows[0];
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function addUser({ username, password, age, country }) {
    try {
        await pool.execute(
            'INSERT INTO user (id, username, password, age, country) VALUES (UUID(), ?, ?, ?, ?)',
            [username, password, age, country]
        );
        const [rows, fields] = await pool.execute('SELECT id, username, age, country from user where username =?', [username]);
        return rows[0];
    } catch (err) {
        console.log('ERROR: ', err)
        if (err.errno === 1062) {
            throw Error('Username already exists');
        } else {
            throw Error('An SQL error occured');
        }
    }
}

async function getProduct(id) {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM product where productId= ?', [id]);
        return rows;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function getProducts() {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM product');
        return rows;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function getProdByCategory(category) {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM product where category= ?', [category]);
        return rows;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }

}

module.exports = {
    getUserByUsername,
    addUser,
    getProduct,
    getProducts,
    getProdByCategory,
}