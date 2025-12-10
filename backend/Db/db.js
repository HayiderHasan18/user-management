const mysql2 = require('mysql2');

const dbConnection = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);

module.exports = dbConnection.promise();
