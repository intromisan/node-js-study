const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-study',
    password: 'Pa8633004329'
});

module.exports = pool.promise();