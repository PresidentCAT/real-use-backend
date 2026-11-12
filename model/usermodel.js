const { pool } = require('../config/db')

const getall = async () => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT user_id, username, email, fullname, role FROM users ORDER BY user_id`
        )
        return row
    } finally {
        conn.release()
    }
}

const getbyid = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT user_id, username, email, fullname, role FROM users WHERE user_id = ?`,
            [id]
        )
        return row[0] || null
    } finally {
        conn.release()
    }
}

const create = async (params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO users (username, password, email, fullname, role) VALUES (?, ?, ?, ?, ?)`,
            [params.username, params.password, params.email, params.fullname, params.role]
        )
        return row
    } finally {
        conn.release()
    }
}

const updateuser = async (id, params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE users SET username = ?, email = ?, fullname = ?, role = ? WHERE user_id = ?`,
            [params.username, params.email, params.fullname, params.role, id]
        )
        return row
    } finally {
        conn.release()
    }
}

const updatepassword = async (id, password) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE users SET password = ? WHERE user_id = ?`,
            [password, id]
        )
        return row
    } finally {
        conn.release()
    }
}

const remove = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `DELETE FROM users WHERE user_id = ?`,
            [id]
        )
        return row
    } finally {
        conn.release()
    }
}

module.exports = { getall, getbyid, create, updateuser, updatepassword, remove }
