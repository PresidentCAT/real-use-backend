require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/indicator', require('./router/indicatorrouter'))
app.use('/api/period', require('./router/periodrouter'))
app.use('/api/topic', require('./router/topicrouter'))
app.use('/api/auth', require('./router/authrouter'))
app.use('/api/user', require('./router/userrouter'))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'backend is running' })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
