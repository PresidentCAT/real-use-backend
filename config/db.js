require('dotenv').config()
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    dateStrings:true,
})

module.exports = {pool}