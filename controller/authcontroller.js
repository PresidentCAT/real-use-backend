const model = require('../model/authmodel')
const bcrypt = require('bcrypt')
const { signtoken } = require('../middleware/auth_middleware')

exports.register = async (req, res) => {
    const { username, password, fullname, email } = req.body
    try {
        if (!username || !password || !fullname || !email)
            return res.status(400).json({ message: 'please fill all field' })

        const check = await model.checkusername(username)
        if (check) return res.status(400).json({ message: 'this username already use' })

        const hash = await bcrypt.hash(password, 10)
        const result = await model.register(username, hash, fullname, email)
        return res.status(201).json({ status: 'success', message: 'register success', data: { id: result.insertId } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password)
            return res.status(400).json({ message: 'please fill all field' })

        const user = await model.checkusername(username)
        if (!user) return res.status(400).json({ message: 'invalid username or password' })

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) return res.status(400).json({ message: 'invalid username or password' })

        const token = signtoken(user.user_id, user.username, user.role)
        res.status(200).json({ message: 'success', authorization: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong in server' })
    }
}
