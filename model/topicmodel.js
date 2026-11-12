const { pool } = require('../config/db')

const getall = async () => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM topics ORDER BY id`)
        return row
    } finally {
        conn.release()
    }
}

const getbyid = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM topics WHERE id = ?`, [id])
        return row[0] || null
    } finally {
        conn.release()
    }
}

const create = async (params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO topics (name, description) VALUES (?, ?)`,
            [params.name, params.description]
        )
        return row
    } finally {
        conn.release()
    }
}

const updatetopics = async (id, params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE topics SET name = ?, description = ? WHERE id = ?`,
            [params.name, params.description, id]
        )
        return row
    } finally {
        conn.release()
    }
}

const remove = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`DELETE FROM topics WHERE id = ?`, [id])
        return row
    } finally {
        conn.release()
    }
}

module.exports = { getall, getbyid, create, updatetopics, remove }
