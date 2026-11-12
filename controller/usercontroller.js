const usermodel = require('../model/usermodel')
const authmodel = require('../model/authmodel')
const bcrypt = require('bcrypt')

const lockrole = ['hr', 'judge', 'user']

exports.getall = async (req, res) => {
    try {
        const result = await usermodel.getall()
        res.status(200).json({ status: 'success', message: 'user list', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.getbyid = async (req, res) => {
    const { id } = req.params
    try {
        const result = await usermodel.getbyid(id)
        if (!result) return res.status(404).json({ message: 'user not found' })
        res.status(200).json({ status: 'success', message: 'user detail', data: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.create = async (req, res) => {
    const { username, password, fullname, email, role } = req.body
    try {
        if (!username || !password || !fullname || !email || !role)
            return res.status(400).json({ message: 'please fill all field' })

        if (!lockrole.includes(role))
            return res.status(400).json({ message: 'invalid role' })

        const check = await authmodel.checkusername(username)
        if (check) return res.status(400).json({ message: 'this username already use' })

        const hash = await bcrypt.hash(password, 10)
        const result = await usermodel.create({ username, password: hash, email, fullname, role })
        return res.status(201).json({ status: 'success', message: 'create success', data: { id: result.insertId } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.updateuser = async (req, res) => {
    const { id } = req.params
    const { username, email, fullname, role } = req.body
    try {
        if (!username || !email || !fullname || !role)
            return res.status(400).json({ message: 'please fill all field' })

        if (!lockrole.includes(role))
            return res.status(400).json({ message: 'invalid role' })

        const user = await usermodel.getbyid(id)
        if (!user) return res.status(404).json({ message: 'user not found' })

        await usermodel.updateuser(id, { username, email, fullname, role })
        return res.status(200).json({ status: 'success', message: 'update success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.updatepassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    try {
        if (!password) return res.status(400).json({ message: 'please fill password' })

        const user = await usermodel.getbyid(id)
        if (!user) return res.status(404).json({ message: 'user not found' })

        const hash = await bcrypt.hash(password, 10)
        await usermodel.updatepassword(id, hash)
        return res.status(200).json({ status: 'success', message: 'update password success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params
    try {
        const user = await usermodel.getbyid(id)
        if (!user) return res.status(404).json({ message: 'user not found' })

        await usermodel.remove(id)
        return res.status(200).json({ status: 'success', message: 'delete success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}
