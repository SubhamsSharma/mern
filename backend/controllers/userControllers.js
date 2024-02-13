const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// register

const registerUser = asyncHandler (async(req, res) => {
    const { name, email, password} = req.body

    // check for name, email, password
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please provide all the credentials")
    }
    // check if user exist already, recommend to use another email
    const userExist  = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("Email already exists. Please try diffrent email")
    }

    // if all the credentials are provided , and user doesn't exist. Create User

    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if (user){
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user")
    }
})

//  login
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    
    // check if email doesn't exist , send an error message
    //  if email exist and password doesn't match incorrect password 
    //  if email exist an dpassword matches log in
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("Invaild Email")
    }
     if (user && !(await bcrypt.compare(password,user.password))){
        res.status(400)
        throw new Error("Invaild Password")
     }

     if (user && await bcrypt.compare(password,user.password)){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email
        })
     }
})

//get user datails
const getMe = asyncHandler( async (req, res) => {
    res.json({message:"your details"})
})

module.exports = { registerUser, loginUser, getMe}