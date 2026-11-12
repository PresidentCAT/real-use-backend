const jwt = require('jsonwebtoken')
require('dotenv').config()

const signtoken = (id, username, role) => {
    return jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

const vrftoken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'no token' })
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        console.log(req.user)
        next()
    } catch (e) {
        return res.status(401).json({ message: "invalid or expired token" })
    }
}

const role = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "forbidden" })
    }
    next()
}

module.exports = { signtoken, vrftoken, role }