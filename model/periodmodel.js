const { pool } = require('../config/db')

const getall = async () => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM periods ORDER BY id`)
        return row
    } finally {
        conn.release()
    }
}

const getbyid = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM periods WHERE id = ?`, [id])
        return row[0] || null
    } finally {
        conn.release()
    }
}

const create = async (params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO periods (name, start_date, end_date) VALUES (?, ?, ?)`,
            [params.name, params.start_date, params.end_date]
        )
        return row
    } finally {
        conn.release()
    }
}

const updateperiod = async (id, params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE periods SET name = ?, start_date = ?, end_date = ? WHERE id = ?`,
            [params.name, params.start_date, params.end_date, id]
        )
        return row
    } finally {
        conn.release()
    }
}

const remove = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`DELETE FROM periods WHERE id = ?`, [id])
        return row
    } finally {
        conn.release()
    }
}

module.exports = { getall, getbyid, create, updateperiod, remove }
