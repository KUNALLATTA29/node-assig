const userModel = require('../model/userModel')
const nodemailer = require('nodemailer')


exports.handleusers = async (req,res)=>{
    try{
        const users = await userModel.find({})
        return res.status(200).json({users})
    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}

exports.handlesingleuser = async(req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(401).json({message:"id is required"})
        }
        const user = await userModel.findById(id)
        if(!user){
            return res.status(401).json({message:"user bot found"})
        }
        return res.status(200).json({message:"user found",user})
    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}

exports.handleforgetpassword = async(req,res)=>{
    try{
        const {email} = req.body
        if(!email){
            return res.status(401).json({message:"email is required"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({message:"invalid email"})
        }
        const otp = Math.floor(Math.random()*1000000).toString()
        const expiretime = moment().add(10,'minutes').toDate()

        user.otp = otp
        user.expire = expiretime
        await user.save()

        const transporter = nodemailer.createTransport({
            host: 'live.smtp.mailtrap.io',
            port: 587,
            secure: false, // use SSL
            auth: {
              user: '1a2b3c4d5e6f7g',
              pass: '1a2b3c4d5e6f7g',
            }
        })

    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}