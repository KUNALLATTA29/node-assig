const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const userRoute = require('./routes/usersRoutes')
const {auth} = require('./middlewares/auth')

dotenv.config()

const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo is connected")
}).catch(()=>{
    console.log('error in connecting mongo')
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',auth,userRoute)


app.listen(process.env.PORT, ()=>{
    console.log("port is running")
})