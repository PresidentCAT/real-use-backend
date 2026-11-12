const model = require('../model/topicmodel')

exports.getall = async (req, res) => {
    try {
        const result = await model.getall()
        res.status(200).json({ status: 'success', message: 'topic list', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.getbyid = async (req, res) => {
    const { id } = req.params
    try {
        const result = await model.getbyid(id)
        if (!result) return res.status(404).json({ message: 'topic not found' })
        res.status(200).json({ status: 'success', message: 'topic detail', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.create = async (req, res) => {
    const { name, description } = req.body
    try {
        if (!name) return res.status(400).json({ message: 'please fill name' })
        const result = await model.create({ name, description: description || null })
        return res.status(201).json({ status: 'success', message: 'create success', data: { id: result.insertId } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.updatetopics = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    try {
        if (!name) return res.status(400).json({ message: 'please fill name' })
        const topic = await model.getbyid(id)
        if (!topic) return res.status(404).json({ message: 'topic not found' })
        await model.updatetopics(id, { name, description: description || null })
        return res.status(200).json({ status: 'success', message: 'update success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params
    try {
        const topic = await model.getbyid(id)
        if (!topic) return res.status(404).json({ message: 'topic not found' })
        await model.remove(id)
        return res.status(200).json({ status: 'success', message: 'delete success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}
