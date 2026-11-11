const { pool } = require('../config/db')

const getall = async () => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `SELECT * FROM users ORDER BY id `
        )
        return row
    }finally{
        conn.release()
    }
}

const getbyid = async (id) => {
let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `SELECT * FROM users WHERE id = ?`
            [id]
        )
        return row
    }finally{
        conn.release()
    }
}

const create = async (params) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `INSERT INTO users (username, password, fullname, email, role) VALUES (?, ?, ?, ?, ?)`,
            [params.username, params.password, params.fullname, params.role]
        )
        return row
    }finally{
        conn.release()
    }
}

const updateuser = async(id, params) => {
    let conn = await pool.getConnection()
    try{
        const [rows] = await conn.query(
            `UPDATE users SET fullname = ?, role = ? WHERE id = ?`,
            [params.fullname, params.role, id]
        )
        return rows
    }finally{
        conn.release()
    }
}

const updatepassword = async (password, id) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `UPDATE users SET password = ? WHERE id =?`,
            [password, id]
        )
        return row
    }finally{
        conn.release()
    }
}

const remove = async (id) => {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        )
        return row
    }finally{
        conn.release()
    }
}

module.exports = {getall, getbyid, create, updateuser , updatepassword, remove}