const UserModel = require("../models/user_model")


// This controller fetch current user or create a new user if otherwise

module.exports.fetchUser = async (req, res) =>{
    const {_id} = req.body

    const user = await UserModel.findOne({_id})
    if(!user){
        const newUser = await UserModel.create({})
        res.status(201).json({newUser: newUser._id})
    }else{
        res.status(201).json({oldUser: _id})
    }
}