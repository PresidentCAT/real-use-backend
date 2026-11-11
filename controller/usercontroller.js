const usermodel = require('../model/usermodel')
const model = require('../model/authmodel')
const bcrypt = require('bcrypt')

exports.getall = async (req, res) => {
    try{
        const {username, fullname} = req.params
        const result = await model.getall(username, fullname)
        res.json({status:"suscess", message:"user list", data:result})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something wrong in server"})
    }
}

exports.getbyid = async (req, res) => {
    try{
        const { id } = req.params
        const result = await model.getbyid(id)
        if(!result) return res.status(404).json({message:"user not find"})
            res.json({status:"suscess", message:"user detail", data:result})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something wrong in server"})
    }
}

exports.create = async (req, res) => {
    const {username, password, fullname, role} = req.body
    try{
        if(!username || !password || !fullname || role)
            return res.status(400).json({message:"please fill all field"})

        const lockrole = ['hr','teacher', 'noob']
        if(!lockrole.includes(role))
            return res.status(400).json({message:'invalid role'})

        const check =  await model.checkusername(username)
        if (check) 
            return res.status(400).json({message:"this username alredy use"})
        const hash = await bcrypt.hash(password, 10)
        const result = await model.create({username, password:hash,fullname, role})
        return res.status(201).json({status:"suscess", message:"create suscess", data:{id: result.insertId}})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something wrong in server"})
    }
}

exports.updateuser = async (req, res) => {
    const { id } = req.params
    const {username, fullname, role} = req.body
    try{
        const user = await model.getbyid(id)
        if(!user) return res.status(404).json({message:"user not found"})
            await model.updateuser(id, {username, fullname, role})
        return res.status(200).json({message:"update suscess"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something wrong in server"})
    }
    
}

exports.updatepassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    try {
        if (!password) return res.status(400).json({ message: "please fill password" })
        const user = await usermodel.getbyid(id)
        if (!user) return res.status(404).json({ message: "user not found" })
        const hash = await bcrypt.hash(password, 10)
        await usermodel.updatepassword(id, hash)
        return res.json({ message: "update password success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something wrong in server" })
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params
    try{
        const user = await model.getbyid(id)
        if(!user) return res.status(400).json({message:"user not found"})
            await model.remove(id)
        return res.status(200).json({message:"delete suscess"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"something worng in server"})
    }
    
}