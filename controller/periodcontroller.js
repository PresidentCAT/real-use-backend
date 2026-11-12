const model = require('../model/periodmodel')

const checkbody = (body) => {
    const { name, start_date, end_date } = body || {}
    if (!name || !start_date || !end_date)
        return 'please fill all field'
    const start = new Date(start_date)
    const end = new Date(end_date)
    if (isNaN(start) || isNaN(end))
        return 'invalid date format'
    if (start > end)
        return 'start_date must be before end_date'
    return null
}

exports.getall = async (req, res) => {
    try {
        const result = await model.getall()
        res.status(200).json({ status: 'success', message: 'period list', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.getbyid = async (req, res) => {
    const { id } = req.params
    try {
        const result = await model.getbyid(id)
        if (!result) return res.status(404).json({ message: 'period not found' })
        res.status(200).json({ status: 'success', message: 'period detail', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.create = async (req, res) => {
    const { name, start_date, end_date } = req.body
    try {
        const err = checkbody(req.body)
        if (err) return res.status(400).json({ message: err })
        const result = await model.create({ name, start_date, end_date })
        return res.status(201).json({ status: 'success', message: 'create success', data: { id: result.insertId } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.updateperiod = async (req, res) => {
    const { id } = req.params
    const { name, start_date, end_date } = req.body
    try {
        const err = checkbody(req.body)
        if (err) return res.status(400).json({ message: err })
        const period = await model.getbyid(id)
        if (!period) return res.status(404).json({ message: 'period not found' })
        await model.updateperiod(id, { name, start_date, end_date })
        return res.status(200).json({ status: 'success', message: 'update success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params
    try {
        const period = await model.getbyid(id)
        if (!period) return res.status(404).json({ message: 'period not found' })
        await model.remove(id)
        return res.status(200).json({ status: 'success', message: 'delete success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}
