const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.handleregister = async (req,res)=>{
    
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({message:"all fields are required"})
        }
        const userexisted =await userModel.findOne({email})
        if(userexisted){
            return res.json({message:"this email is already in use"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password,salt)
        const newuser = await userModel.create({
            name,
            email,
            password:hashpassword
        })

        return res.json({message:"user registered successfully!",newuser})

    }catch(err){
        return res.json({error:"server error",err})

    }
}

exports.handlelogin = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).json({message:"all fields are required"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const ismatch = bcrypt.compare(user.password,password)
        if(!ismatch){
            return res.status(404).json({message:"password is wrong"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

        return res.status(200).json({message:"User Loggedin Successfully",token})
        
    }catch(err){
        return res.status(500).json({error:"server error",err})
    }
}