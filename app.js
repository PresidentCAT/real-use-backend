const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const env = require('dotenv')
env.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth', require('./router/authrouter'))
app.use('/api/user', require('./router/userrouter'))

app.get('/',(req,res)=>{
    res.status(200).json({message: "backend is running"})
})

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})