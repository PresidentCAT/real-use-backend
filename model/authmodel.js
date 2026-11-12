const { pool } = require('../config/db')

const register = async (username, password, fullname, email) => {
    let conn = await pool.getConnection()
    try{
        const[row] = await conn.query(
            `INSERT INTO users (username, password, fullname, email, role)  VALUES (?, ?, ?, ?, 'user')`,
            [username, password, fullname, email]
        )
        return row
    }finally{
        conn.release()
    }
}


const checkusername = async (username) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        )
        return row[0] || null
    }finally{
        conn.release()
    }
}
module.exports = {register, checkusername}