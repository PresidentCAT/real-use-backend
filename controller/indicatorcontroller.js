const model = require('../model/indicatormodel')
const topicmodel = require('../model/topicmodel')

const evaltype = ['yesno', 'scale']

const setlevel = {
    level1: 'ปฏิบัติได้ต่ำกว่าระดับการปฏิบัติที่คาดหวังมาก',
    level2: 'ปฏิบัติได้ต่ำกว่าระดับการปฏิบัติที่คาดหวัง',
    level3: 'ปฏิบัติได้ตามระดับการปฏิบัติที่คาดหวัง',
    level4: 'ปฏิบัติได้สูงกว่าระดับการปฏิบัติที่คาดหวัง'
}

const checkbody = (body) => {
    const { topic_id, name, weight, eval_type } = body || {}

    if (!topic_id || !String(name || '').trim() || !weight || !eval_type)
        return 'please fill all field'

    if (!evaltype.includes(eval_type))
        return 'eval_type must be yesno or scale'

    if (!(Number(weight) > 0))
        return 'weight must be a number greater than 0'

    return null
}

const buildparams = (body) => {
    const isscale = body.eval_type === 'scale'
    return {
        topic_id: body.topic_id,
        name: body.name,
        description: body.description || null,
        weight: body.weight,
        eval_type: body.eval_type,
        evidence_desc: body.evidence_desc || null,
        level1: isscale ? (body.level1 || setlevel.level1) : null,
        level2: isscale ? (body.level2 || setlevel.level2) : null,
        level3: isscale ? (body.level3 || setlevel.level3) : null,
        level4: isscale ? (body.level4 || setlevel.level4) : null,
    }
}

exports.getall = async (req, res) => {
    try {
        const result = await model.getall()
        res.status(200).json({ status: 'success', message: 'indicator list', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.getbyid = async (req, res) => {
    const { id } = req.params
    try {
        const result = await model.getbyid(id)
        if (!result) return res.status(404).json({ message: 'indicator not found' })
        res.status(200).json({ status: 'success', message: 'indicator detail', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.create = async (req, res) => {
    try {
        const err = checkbody(req.body)
        if (err) return res.status(400).json({ message: err })

        const topic = await topicmodel.getbyid(req.body.topic_id)
        if (!topic) return res.status(400).json({ message: 'topic not found' })

        const result = await model.create(buildparams(req.body))
        return res.status(201).json({ status: 'success', message: 'create success', data: { id: result.insertId } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.updateindicator = async (req, res) => {
    const { id } = req.params
    try {
        const err = checkbody(req.body)
        if (err) return res.status(400).json({ message: err })

        const indicator = await model.getbyid(id)
        if (!indicator) return res.status(404).json({ message: 'indicator not found' })

        const topic = await topicmodel.getbyid(req.body.topic_id)
        if (!topic) return res.status(400).json({ message: 'topic not found' })

        await model.updateindicator(id, buildparams(req.body))
        return res.status(200).json({ status: 'success', message: 'update success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params
    try {
        const indicator = await model.getbyid(id)
        if (!indicator) return res.status(404).json({ message: 'indicator not found' })
        await model.remove(id)
        return res.status(200).json({ status: 'success', message: 'delete success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}
