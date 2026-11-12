const { pool } = require('../config/db')

const getall = async () => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM indicators ORDER BY id`)
        return row
    } finally {
        conn.release()
    }
}

const getbyid = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`SELECT * FROM indicators WHERE id = ?`, [id])
        return row[0] || null
    } finally {
        conn.release()
    }
}

const create = async (params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO indicators (topic_id, name, description, weight, eval_type, evidence_desc, level1, level2, level3, level4)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [params.topic_id, params.name, params.description,
             params.weight, params.eval_type, params.evidence_desc,
             params.level1, params.level2, params.level3, params.level4]
        )
        return row
    } finally {
        conn.release()
    }
}

const updateindicator = async (id, params) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE indicators
             SET topic_id = ?, name = ?, description = ?, weight = ?, eval_type = ?, evidence_desc = ?,
                 level1 = ?, level2 = ?, level3 = ?, level4 = ?
             WHERE id = ?`,
            [params.topic_id, params.name, params.description,
             params.weight, params.eval_type, params.evidence_desc,
             params.level1, params.level2, params.level3, params.level4, id]
        )
        return row
    } finally {
        conn.release()
    }
}

const remove = async (id) => {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(`DELETE FROM indicators WHERE id = ?`, [id])
        return row
    } finally {
        conn.release()
    }
}

module.exports = { getall, getbyid, create, updateindicator, remove }
