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

async function addProduct(product) {

}

async function removeProduct(id) {

}

async function updateProduct(product) {

}

async function getProduct(id) {
}

async function getProducts() {
    try {

        const [rows, fields] = await pool.execute('SELECT * FROM products');
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
    return rows;
}

async function getProductsByCategory(category) {

}



module.exports = {
    getUserByUsername,
    addUser,
    addProduct,
    removeProduct,
    updateProduct,
    getProduct,
    getProducts,
    getProductsByCategory,
}