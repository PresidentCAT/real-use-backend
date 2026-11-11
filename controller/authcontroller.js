const model = require('../model/authmodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { signtoken } = require('../middleware/auth_middleware')

exports.register = async (req, res) => {
    const {username, password, fullname, email} = req.body
    console.log('สมัคร',{username, password, fullname, email})
    try{
        if (!username || !password || !fullname || !email)
            return res.status(400).json({message:"please fill all field"})
        const checkusername = await model.checkusername(username)
        if(checkusername) return res.status(400).json({message:"this username alredy use"})
        const hash = await bcrypt.hash(password, 10)
        const result = await model.register(username, hash, fullname, email)
        console.log(result)
        return res.status(201).json({status:"success", message:"register success", data:{id: result.insertId}})
    }catch (error){
        console.log(error)
        res.status(500).json({message:"something wrong in server"})
    }
}


exports.login = async (req, res) => {
    const {username, password} = req.body
    console.log(username,password)
    try{
        const user = await model.checkusername(username)
        if(!user) return res.status(400).json({message:"invalid username & password"})
            const ismatch = await bcrypt.compare(password, user.password)
        if(!ismatch) return res.status(400).json({message:"nvalid username && password"})
            const token = signtoken(user.user_id,user.username,user.role)
        if(!token) return res.status(400).json({message:"unauthrization"})
            console.log(jwt.decode(token))
        res.status(200).json({message:"success", authorization:token})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something wrong in server"})
    }
}