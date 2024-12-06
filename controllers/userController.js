const userModel = require('../model/userModel')



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

